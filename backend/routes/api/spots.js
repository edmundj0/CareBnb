const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth')
const {Op} = require('sequelize')
const { Spot, User, Review, SpotImage, ReviewImage, Booking, sequelize, Sequelize } = require('../../db/models')

const router = express.Router();

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { checkValidation, validateNewSpot, checkSpotAndOwnership, validateNewReview } = require('./validations')




//GET All Spots - return all the spots (require auth - false)
router.get('/', async (req, res) => {


    let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;


    const returnErrors = {
        message: "Validation Error",
        statusCode: 400,
        errors: {}
    }

    if(!size) size = 20;
    if(!page) page = 1;

    page = parseInt(page);
    size = parseInt(size);

    if(page < 1) returnErrors.errors.page = 'Page must be greater than or equal to 1'
    if(size < 1) returnErrors.errors.size = 'Size must be greater than or equal to 1'

    if(page > 10) returnErrors.errors.maxPage = 'Page must be less than or equal to 10'
    if(size > 20) returnErrors.errors.maxSize = 'Size must be less than or equal to 20'

    if(Number.isNaN(page) || Number.isNaN(size)) returnErrors.errors.pageOrNumber = 'Page and number must be integers'

    if(Object.keys(returnErrors.errors).length !== 0){
        return res.status(400).json(returnErrors)
    }


    const limit = size;
    const offset = size * (page - 1)

    let paginateSpots = await Spot.findAll({
        limit,
        offset
    })

    let allSpots = [];

    for(let i=0; i < paginateSpots.length; i++){

        let eachSpot = paginateSpots[i].toJSON()

        console.log(eachSpot)

        let avgRating = await Review.findAll({
            raw: true,
            where: {spotId: paginateSpots[i].id},
            attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
        })

        let previewImage = await SpotImage.findAll({
            raw: true,
            where: { spotId: paginateSpots[i].id},
            attributes: ['url']
        })

        if(avgRating[0]){
            eachSpot.avgRating = avgRating[0].avgRating
        }else{
            eachSpot.avgRating = null
        }

        if(previewImage[0]){
            eachSpot.previewImage = previewImage[0].url
        }else{
            eachSpot.previewImage = null
        }

        allSpots.push(eachSpot)

    }

    return res.status(200).json({
        Spots: allSpots,
        page,
        size
    })


    // const allSpots = await Spot.findAll({
    //     include: [{ model: Review, attributes: [], required: false }, { model: SpotImage, attributes: [], where: { preview: true }, required: false }],
    //     attributes: {
    //         include: [
    //             [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
    //             [Sequelize.col('SpotImages.url'), 'previewImage']
    //         ]
    //     },
    //     group: ['Spot.id', 'SpotImages.url'],
    //     limit:3,
    //     offset:0,
    //     subQuery: false,
    // })


    // return res.status(200).json({
    //     Spots: allSpots,
    //     // page,
    //     // size
    // })
})

//GET All Spots owned by the Current User (require auth - true)
router.get('/current', requireAuth, async (req, res) => {

    const { user } = req;

    const currentUserSpots = await Spot.findAll({
        where: { ownerId: user.id },
        include: [{ model: Review, attributes: [] }, { model: SpotImage, attributes: [], where: {preview: true}, required: false }],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
                [sequelize.col('SpotImages.url'), 'previewImage']
            ]
        },
        group: ['Spot.id', 'SpotImages.url']

    })

    return res.status(200).json({
        Spots: currentUserSpots
    })
})

//GET Details of a spot from an id (require authentication - false)

router.get('/:spotId', async (req, res) => {

    const { spotId } = req.params;

    let spot = await Spot.findByPk(spotId,
        {

            include: [
                { model: Review, attributes: ["id", "stars"] },
                { model: SpotImage, attributes: ["id", "url", "preview"], required: false },
                { model: User, as: 'Owner', attributes: ["id", "firstName", "lastName"] }
            ],

            // attributes: {
            //     include: [
            //         [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews']
            //     ]
            // }, where: {'Reviews.spotId' : spotId}
        })

    if (!spot) return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404
    })

    spot = spot.toJSON()
    spot.numReviews = spot.Reviews.length

    // let sumOfStars = 0;
    // for(let review of spot.Reviews){
    //     sumOfStars += review.stars
    // }

    let sumOfStars = spot.Reviews.reduce((accum, value) => accum + value.stars, 0)
    spot.avgStarRating = sumOfStars / spot.Reviews.length

    delete spot.Reviews

    return res.status(200).json(
        spot
    )
})


// Create a Spot (require authentication - true)


router.post('/', requireAuth, validateNewSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const newSpot = await Spot.create({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price })

    return res.status(201).json(newSpot)
})


//Add an image to a Spot based on the Spot's Id - (require authentication - true)

router.post('/:spotId/images', requireAuth, async (req, res) => {

    const { spotId } = req.params
    const { url, preview } = req.body

    const spot = await Spot.findByPk(spotId)


    //if no spot exists or if owner doesn't own the spot, 404 error
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if(req.user.id !== spot.ownerId){
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    let newSpotImage = await SpotImage.create({
        spotId: spotId,
        url: url,
        preview: preview
    })

    newSpotImage = newSpotImage.toJSON();
    delete newSpotImage.spotId
    delete newSpotImage.createdAt
    delete newSpotImage.updatedAt

    return res.status(200).json(newSpotImage)
})



//Edit a Spot (require auth - true)



router.put('/:spotId', requireAuth, checkSpotAndOwnership, validateNewSpot, async (req, res) => {

    let spot = await Spot.findByPk(req.params.spotId)

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    spot = await spot.update({
        address, city, state, country, lat, lng, name, description, price
    })

    return res.status(200).json(spot)

})


//DELETE a Spot (require auth -true)

router.delete('/:spotId', requireAuth, checkSpotAndOwnership, async (req, res) => {

    const deleteSpot = await Spot.findByPk(req.params.spotId)

    await deleteSpot.destroy();

    return res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })
})


// GET all Reviews by a Spot's id (require authentication - false)

router.get('/:spotId/reviews', async (req, res) => {

    const { spotId } = req.params;

    let spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    let reviews = await Review.findAll({
        where: { spotId: spotId },
        include: [
            { model: User, attributes: ["id", "firstName", "lastName"] },
            { model: ReviewImage, attributes: ["id", "url"] }
        ]
    })

    return res.status(200).json({
        Reviews: reviews
    })

})

//Create a Review for a Spot based on Spot's id

router.post('/:spotId/reviews', requireAuth, validateNewReview, async (req, res) => {

    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const checkExistingReview = await Review.findOne({
        where: {
            spotId: spotId,
            userId: req.user.id
        }
    })

    if (checkExistingReview) {
        return res.status(403).json({
            message: "User already has a review for this spot",
            statusCode: 403
        })
    }

    const { review, stars } = req.body;

    const newReview = await Review.create({
        userId: req.user.id,
        spotId: spotId,
        review: review,
        stars: stars
    })

    return res.status(201).json(newReview)

})


//GET all Bookings for a Spot based on Spot's id

router.get('/:spotId/bookings', requireAuth, async (req, res) => {

    const { spotId } = req.params;

    let spot = await Spot.findByPk(spotId)


    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }


    if (req.user.id == spot.ownerId) {
        let ownerBookings = await Booking.findAll({
            where: { spotId: spotId },
            include: [
                { model: User, attributes: ['id', 'firstName', 'lastName'] }
            ],
            attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
        })

        return res.status(200).json({
            Bookings: ownerBookings
        })
    } else {
        let notOwnerBookings = await Booking.findAll({
            where: { spotId },
            attributes: ['spotId', 'startDate', 'endDate']
        })

        return res.status(200).json({
            Bookings: notOwnerBookings
        })

    }

})

//Create a booking from a spot based on the Spot's id

router.post('/:spotId/bookings', requireAuth, async (req, res) => {

    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if (req.user.id == spot.ownerId) {
        return res.status(403).json({
            message: "Forbidden, can't book your own spot",
            statusCode: 403
        })
    }
    const { startDate, endDate } = req.body

    const newStartDate = new Date(startDate)
    const newEndDate = new Date(endDate)

    const existingBookings = await Booking.findAll({
        where: { spotId: spotId }
    })

    //check if endDate is on or before startDate
    if (newStartDate >= newEndDate) {
        return res.status(400).json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        })
    }


    //check for overlapping existing bookings on the same spot
    for (let ele of existingBookings) {
        let existingStartDate = new Date(ele.startDate)
        let existingEndDate = new Date(ele.endDate)

        if (newEndDate >= existingStartDate && newEndDate <= existingEndDate && newStartDate >= existingStartDate && newStartDate <= existingEndDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        } else if (newEndDate >= existingStartDate && newEndDate <= existingEndDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    endDate: "End date conflicts with an existing booking"
                }
            })
        } else if (newStartDate >= existingStartDate && newStartDate <= existingEndDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking"
                }
            })
        } else if(newStartDate <= existingStartDate && newEndDate > existingEndDate){
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }

    }


    const newBooking = await Booking.create({
        userId: req.user.id,
        spotId: spotId,
        startDate: startDate,
        endDate: endDate
    })

    return res.status(200).json(newBooking)



})



module.exports = router;

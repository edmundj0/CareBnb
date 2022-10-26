const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { Spot, User, Review, SpotImage, sequelize } = require('../../db/models')

const router = express.Router();

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



//GET All Spots - return all the spots (require auth - false)
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        include: [{ model: Review, attributes: [] }, { model: SpotImage, attributes: [] }],
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
                [sequelize.col('SpotImages.url'), 'previewImage']
            ]
        },
        group: ['Spot.id', 'SpotImages.url']
    })

    return res.status(200).json({
        Spots: allSpots
    })
})

//GET All Spots owned by the Current User (require auth - true)
router.get('/current', requireAuth, async (req, res) => {

    const { user } = req;

    const currentUserSpots = await Spot.findAll({
        where: { ownerId: user.id },
        include: [{ model: Review, attributes: [] }, { model: SpotImage, attributes: [] }],
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
                { model: SpotImage, attributes: ["id", "url", "preview"] },
                { model: User, as: 'Owner', attributes: ["id", "firstName", "lastName"] }
            ],

            // attributes: {
            //     include: [
            //         [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews']
            //     ]
            // }, where: {'Reviews.spotId' : spotId}
        })

    if (!spot) res.status(404).json({
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

const checkValidation = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {

        console.log(validationErrors)

        let returnErrObj = {}
        for (let err of validationErrors.errors) {
            returnErrObj[err.param] = err.msg
        }

        return res.status(400).json({
            message: 'Validation Error',
            statusCode: 400,
            errors: returnErrObj
        })
    }
    next();
}

const validateNewSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name must be less than 50 characters')
        .isLength({ max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    checkValidation
]


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
    if(!spot || req.user.id !== spot.ownerId){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
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

const checkSpotAndOwnership = async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot || req.user.id !== spot.ownerId){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    return next()
}

router.put('/:spotId', requireAuth, checkSpotAndOwnership, validateNewSpot, async (req, res) => {

    let spot = await Spot.findByPk(req.params.spotId)

    const { address, city, state, country, lat, lng, name, description, price} = req.body

    spot = await spot.update({
        address, city, state, country, lat, lng, name, description, price
    })

    res.status(200).json(spot)

})


//DELETE a Spot (require auth -true)

router.delete('/:spotId', requireAuth, checkSpotAndOwnership, async(req, res) => {

    const deleteSpot = await Spot.findByPk(req.params.spotId)

    await deleteSpot.destroy();

    return res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })
})



module.exports = router;

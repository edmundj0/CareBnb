const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { Spot, User, Review, SpotImage, sequelize } = require('../../db/models')

const router = express.Router();

const { check } = require('express-validator');
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
            { model: User, as: 'Owner', attributes: ["id", "firstName", "lastName"]}
        ],

        // attributes: {
        //     include: [
        //         [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews']
        //     ]
        // }, where: {'Reviews.spotId' : spotId}
})

    if(!spot) res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: "404"
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


module.exports = router;

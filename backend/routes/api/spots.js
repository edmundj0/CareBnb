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
            include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                "avgRating"], [sequelize.col('SpotImages.url'), 'previewImage']]
        },
        group: ['Spot.id', 'SpotImages.url']
    })

    return res.json({
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
            include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                "avgRating"], [sequelize.col('SpotImages.url'), 'previewImage']]
        },
        group: ['Spot.id', 'SpotImages.url']

        })

        return res.json({
            Spots: currentUserSpots
        })
    })




    module.exports = router;

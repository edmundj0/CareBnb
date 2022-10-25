const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { Spot, User, Review, sequelize } = require('../../db/models')

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



//GET All Spots - return all the spots (require auth - false)
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        include: { model: Review },
        attributes: {include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")),
        "avgRating"]]},
        group: 'Spot.id'
    })

    console.log(allSpots)

    return res.json({
        Spots: allSpots
    })
})

//GET All Spots owned by the Current User (require auth - true)
router.get('/current', requireAuth, async (req, res) => {

    const currentUserSpots = await Spot.findAll({
    })
    console.log(req, '**************test')
})




module.exports = router;

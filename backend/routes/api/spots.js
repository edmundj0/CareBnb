const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { Spot, User, Review, sequelize } = require('../../db/models')

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');




//GET All Spots - return all the spots (require auth - false)
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        include: { model: Review, attributes: [], required: false },
        // attributes: {include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")),
        // "avgRating"]]}
        attributes: {include: 'hi'}






        // { model: {Review ,
        // include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")),
        //     "avgRating"]]}
        // }
    })


    return res.json({
        Spots: allSpots
    })
})

//GET All Spots owned by the Current User (require auth - true)
router.get('/current', async (req, res) => {

})




module.exports = router;

const express = require('express');

const { requireAuth } = require('../../utils/auth')
const { Spot, User, Review, SpotImage, ReviewImage, Booking, sequelize } = require('../../db/models')

const router = express.Router();

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validateNewReview } = require('./validations');


//GET all of the Current User's Bookings

router.get('/current', requireAuth, async (req, res) => {

    const { user } = req;

    let currentBookings = await Booking.findAll({
        where: { userId: user.id },
        include: [
            { model: Spot, attributes: { exclude: ['createdAt', 'updatedAt', 'description'] } }
        ]
    })

    console.log(currentBookings)

    for (let i = 0; i < currentBookings.length; i++) {
        currentBookings[i] = currentBookings[i].toJSON()


        let previewImg = await SpotImage.findOne({
            where: {
                spotId: currentBookings[i].Spot.id,
                preview: true
            }
        })


        if (!previewImg) {
            currentBookings[i].Spot.previewImg = null
        } else {
            currentBookings[i].Spot.previewImg = previewImg.url
        }

    }

    return res.status(200).json({
        Bookings: currentBookings
    })

})









module.exports = router;

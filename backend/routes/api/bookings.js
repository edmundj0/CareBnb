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


router.put('/:bookingId', requireAuth, async (req, res) => {

    const { bookingId } = req.params

    const booking = await Booking.findByPk(bookingId)

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }

    if (booking.userId !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    const { startDate, endDate } = req.body

    const newStartDate = new Date(startDate)
    const newEndDate = new Date(endDate)

    let existingBookings = await Booking.findAll({
        where: {spotId: booking.spotId}
    })


    existingBookings = existingBookings.filter(function(arr) {
        return arr.dataValues.id != bookingId
    })

    if(newEndDate < Date.now()){
        return res.status(403).json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    }

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

   const updatedRecord = await booking.update({
        startDate: startDate,
        endDate: endDate
   })

    return res.status(200).json(updatedRecord)


})









module.exports = router;

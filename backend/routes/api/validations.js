const express = require('express')

const { check, validationResult } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');

const { Spot, User, Review, SpotImage, ReviewImage, sequelize } = require('../../db/models');

const { setTokenCookie, requireAuth } = require('../../utils/auth');


const checkValidation = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {

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

const checkSpotAndOwnership = async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot || req.user.id !== spot.ownerId) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    return next()
}

const validateNewReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Stars must be an integer from 1 to 5')
        .isIn([1, 2, 3, 4, 5])
        .withMessage('Stars must be an integer from 1 to 5'),
    checkValidation
]


// const validateBookingDates = [
//     check('endDate')
//         .custom((date, { req }) => {
//             console.log(date, 'aaaaaaaaaaaaaaaa')
//             let endDate = new Date(date)
//             console.log(endDate, 'bbbbbbbbbbbbbb')
//             let startDate = new Date(req.body.startDate)
//             if (endDate <= startDate) {
//                 throw new Error('endDate cannot be on or before startDate')
//             } else { return date }
//         }),
//     checkValidation
// ]



// const validateExistingBookings = async function (req, res, next) {

//     const { spotId } = req.params
//     const spot = await Spot.findByPk(spotId)

//     if (!spot) {
//         return res.status(404).json({
//             message: "Spot couldn't be found",
//             statusCode: 404
//         })
//     }

//     if (req.user.id === spot.ownerId) {
//         return res.status(403).json({
//             message: "Forbidden, can't book your own spot",
//             statusCode: 403
//         })
//     }
//     const { startDate, endDate } = req.body

//     const newStartDate = new Date(startDate)
//     const newEndDate = new Date(endDate)

//     const existingBookings = await Booking.findAll({
//         where: { spotId: spotId }
//     })

//     //check if endDate is on or before startDate
//     if (newStartDate >= newEndDate) {
//         return res.status(400).json({
//             message: "Validation error",
//             statusCode: 400,
//             errors: {
//                 endDate: "endDate cannot be on or before startDate"
//             }
//         })
//     }


//     //check for overlapping existing bookings on the same spot
//     for (let ele of existingBookings) {
//         let existingStartDate = new Date(ele.startDate)
//         let existingEndDate = new Date(ele.endDate)
//         console.log(existingEndDate, 'asdfasdf')

//         if (newEndDate >= existingStartDate && newEndDate <= existingEndDate && newStartDate >= existingStartDate && newStartDate <= existingEndDate) {
//             return res.status(403).json({
//                 message: "Sorry, this spot is already booked for the specified dates",
//                 statusCode: 403,
//                 errors: {
//                     startDate: "Start date conflicts with an existing booking",
//                     endDate: "End date conflicts with an existing booking"
//                 }
//             })
//         } else if (newEndDate >= existingStartDate && newEndDate <= existingEndDate) {
//             return res.status(403).json({
//                 message: "Sorry, this spot is already booked for the specified dates",
//                 statusCode: 403,
//                 errors: {
//                     endDate: "End date conflicts with an existing booking"
//                 }
//             })
//         } else if (newStartDate >= existingStartDate && newStartDate <= existingEndDate) {
//             return res.status(403).json({
//                 message: "Sorry, this spot is already booked for the specified dates",
//                 statusCode: 403,
//                 errors: {
//                     startDate: "Start date conflicts with an existing booking"
//                 }
//             })
//         }

//     }

// }


module.exports = { checkValidation, validateNewSpot, checkSpotAndOwnership, validateNewReview }

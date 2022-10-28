const express = require('express');

const { requireAuth } = require('../../utils/auth')
const { Spot, User, Review, SpotImage, ReviewImage, Booking, sequelize } = require('../../db/models')

const router = express.Router();

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validateNewReview } = require('./validations');


//Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {

    const {imageId} = req.params;

    const image = await ReviewImage.findByPk(imageId)

    if(!image){
        return res.status(404).json({
            message: "Review Image couldn't be found",
            statusCode: 404
        })
    }

    const review = await Review.findByPk(image.reviewId)

    if(review.userId != req.user.id){
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    await image.destroy()

    return res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })
})






module.exports = router;

const express = require('express');

const { requireAuth } = require('../../utils/auth')
const { Spot, User, Review, SpotImage, ReviewImage, sequelize} = require('../../db/models')

const router = express.Router();

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Get all Reviews of the Current User (require auth - true)

router.get('/current', requireAuth, async (req, res) => {

    const { user } = req;

    const currentUserReviews = await Review.findAll({
        where: { userId: user.id},
        include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: Spot, attributes: {exclude: ['createdAt', 'updatedAt', 'description']}},
            {model: ReviewImage, attributes: ['id', 'url']}
        ]
    })

    let returnArr = [];
    for (let eachReview of currentUserReviews){
        eachReview = eachReview.toJSON()

        console.log(eachReview.Spot, '*********')

        let previewImg = await SpotImage.findOne({
            where: {
                spotId: eachReview.Spot.id,
                preview: true
            }
        })

        eachReview.Spot.previewImage = previewImg.url;

        returnArr.push(eachReview)
    }

    res.json({
        Reviews: returnArr
    })
})








module.exports = router;

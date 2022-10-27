const express = require('express');

const { requireAuth } = require('../../utils/auth')
const { Spot, User, Review, SpotImage, ReviewImage, sequelize} = require('../../db/models')

const router = express.Router();

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Get all Reviews of the Current User (require auth - true)

router.get('/current', requireAuth, async (req, res) => {

    const { user } = req;

    let currentUserReviews = await Review.findAll({
        where: { userId: user.id},
        include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: Spot, attributes: {exclude: ['createdAt', 'updatedAt', 'description']}},
            {model: ReviewImage, attributes: ['id', 'url']}
        ]
    })

    //let returnArr = [];
    // for (let eachReview of currentUserReviews){
        for(let i=0; i < currentUserReviews.length; i++){
            //eachReview = eachReview.toJSON()
        currentUserReviews[i] = currentUserReviews[i].toJSON()

        let previewImg = await SpotImage.findOne({
            where: {
                spotId: currentUserReviews[i].Spot.id,
                preview: true
            }
        })

        currentUserReviews[i].Spot.previewImage = previewImg.url;

        //returnArr.push(eachReview)
    }

    res.status(200).json({
       // Reviews: returnArr
       Reviews: currentUserReviews
    })
})

// GET all Reviews by a Spot's id (require authentication - false)

router.get('/:spotId/reviews', async (req, res) => {

    const {spotId} = req.params;

    let spot = await Spot.findByPk(spotId)

    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    let reviews = await Review.findAll({
        where: {spotId: spotId},
        include: [
            {model: User, attributes: ["id", "firstName", "lastName"]},
            {model: ReviewImage, attributes: ["id", "url"]}
        ]
    })

    return res.status(200).json({
        Reviews: reviews
    })


})






module.exports = router;

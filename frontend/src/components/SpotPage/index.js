import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import SpotReviews from "../SpotReviews";
import UserNewReviewModal from "../UserNewReviewModal";
import './SpotPage.css'

export default function SpotPage() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const oneSpotRes = useSelector(state => state.spot.individualSpot)
    console.log(oneSpotRes, 'oneSpotRes')

    const currentUser = useSelector(state => state.session.user)
    // console.log(currentUser, 'currentUser')

    const allReviews = useSelector(state => state.review.spotReviews)
    // console.log(allReviews, 'allReviews')
    const allReviewsArr = Object.values(allReviews)

    // const test = useSelector(state => state)
    // console.log(test, 'stateeeee')





    useEffect(() => {
        dispatch(getOneSpot(spotId))
            .then(() => setIsLoaded(true))
    }, [dispatch, spotId])


    if (!oneSpotRes) return (
        <div>Sorry this Spot doesn't exist</div>
    )

    if (!oneSpotRes.SpotImages) return (
        <div>Sorry this Spot doesn't exist</div>
    )

    let userAlreadyReviewed;
    if (currentUser && allReviewsArr.length > 0) {
        userAlreadyReviewed = allReviewsArr.find(review => review.userId === currentUser.id) //returns undefined if not already reviewed
    }
    // console.log(userAlreadyReviewed, 'userAlreadyReviewed')


    return isLoaded && (
        <div className="entire-page">
            <div className="title">
                {oneSpotRes.name}
            </div>
            <div className="header-details">
                <span>★ {oneSpotRes.avgStarRating ? Math.round((Number(oneSpotRes.avgStarRating) * 100) / 100).toFixed(2) : "No Reviews Yet"} ·  </span>
                <span>{`${oneSpotRes.city}, ${oneSpotRes.state}, ${oneSpotRes.country}`}</span>
            </div>
            <div className="all-images-container">
                <div className="main-image-container">
                    {oneSpotRes.SpotImages[0] ? (<img src={oneSpotRes.SpotImages[0].url} id='main-image' alt="Main Pic Not Available or Invalid URL"></img>) : <p>Main Pic Not Available or Invalid URL</p>}
                </div>
                <div className="small-image-container">
                    {oneSpotRes.SpotImages[1] ? (<img src={oneSpotRes.SpotImages[1].url} className='small-image' id='small-image-1' alt="Pic Not Available"></img>) : <p className='pic-error-text'>Pic 2 Not Available</p>}
                    {oneSpotRes.SpotImages[2] ? (<img src={oneSpotRes.SpotImages[2].url} className='small-image' id='small-image-2' alt="Pic Not Available"></img>) : <p className='pic-error-text'>Pic 3 Not Available</p>}
                    {oneSpotRes.SpotImages[3] ? (<img src={oneSpotRes.SpotImages[3].url} className='small-image' id='small-image-3' alt="Pic Not Available"></img>) : <p className='pic-error-text'>Pic 4 Not Available</p>}
                    {oneSpotRes.SpotImages[4] ? (<img src={oneSpotRes.SpotImages[4].url} className='small-image' id='small-image-4' alt="Pic Not Available"></img>) : <p className='pic-error-text'>Pic 5 Not Available</p>}
                </div>
            </div>
            <div className="entire-container-below-images">
                <div className="left-description-container">
                    <div className="hosting-information">
                        <div className="hosting-info-text">
                            <div id='home-hosted-by'>{`Entire home hosted by ${oneSpotRes.Owner.firstName}`}</div>
                            <div id='contact-host'>Contact owner for more information</div>
                        </div>
                       <i class="fa-solid fa-id-badge"></i>
                    </div>
                    <div className="all-reviews-for-spot">
                        <SpotReviews spotId={spotId} />
                    </div>
                </div>
                <div className="right-description-container">
                    <div className="price-and-review">
                        <div>{`${oneSpotRes.price}`}</div>
                        <div>
                            {currentUser && oneSpotRes.Owner.id !== currentUser.id && (!userAlreadyReviewed) && (
                                <UserNewReviewModal />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            In development
        </div>
    )
}

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getAllSpots, getOneSpot } from "../../store/spots";
import SpotReviews from "../SpotReviews";
import UserNewReviewModal from "../UserNewReviewModal";
import './SpotPage.css'

export default function SpotPage() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const oneSpotRes = useSelector(state => state.spot.individualSpot)
    console.log(oneSpotRes, 'oneSpotRes')

    const [hasSubmitted, setHasSubmitted] = useState(false);

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
        dispatch(getAllSpots())
    }, [dispatch, spotId, hasSubmitted])


    if (!oneSpotRes) return null

    if (!oneSpotRes.SpotImages) return null
    // (
    //     <div className="spot-not-found">Sorry this Spot doesn't exist</div>
    // )

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
                <span>★ {oneSpotRes.avgStarRating ? ((Number(oneSpotRes.avgStarRating) * 100) / 100)?.toFixed(2) : "No Reviews Yet"} &nbsp; · </span>
                <span>&nbsp; <i className="fa-sharp fa-solid fa-medal"></i> Superhost &nbsp;·&nbsp; {`${oneSpotRes.city}, ${oneSpotRes.state}, ${oneSpotRes.country}`}</span>
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
            <div className="first-entire-container-below-images">
                <div className="left-description-container">
                    <div className="hosting-information">
                        <div className="hosting-info-text">
                            <div id='home-hosted-by'>{`Entire home hosted by ${oneSpotRes.Owner.firstName}`}</div>
                            <div id='contact-host'>Contact owner for more information</div>
                        </div>
                        <i className="fa-solid fa-id-badge"></i>
                    </div>
                    <div className="features-with-icons-container">
                        <div className="superhost-feature-icon">
                            <i className="fa-sharp fa-solid fa-medal feature-icon-img"></i>
                            <div className="superhost-feature-icon-text">
                                <div className="feature-icon-main-text">{`${oneSpotRes?.Owner?.firstName} is a Superhost`}</div>
                                <div className="feature-icon-second-text">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
                            </div>
                        </div>
                        <div className="superhost-feature-icon">
                            <i className="fa-solid fa-key feature-icon-img"></i>
                            <div className="superhost-feature-icon-text">
                                <div className="feature-icon-main-text">Great check-in experience</div>
                                <div className="feature-icon-second-text">100% of recent guests gave the check-in process a 5-star rating.</div>
                            </div>
                        </div>
                        <div className="superhost-feature-icon">
                            <i className="fa-solid fa-calendar feature-icon-img"></i>
                            <div className="superhost-feature-icon-text">
                                <div className="feature-icon-main-text">Free cancellation for 48 hours </div>
                            </div>
                        </div>
                    </div>
                    <div className="aircover-total-container">
                        <img src="https://raw.githubusercontent.com/edmundj0/Care-bnb-images/main/aircover%20image.webp" alt="aircover" className="air-cover-img"></img>
                        <div className="air-cover-text">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>

                    </div>
                    <div className="spot-description-container">
                        <div className="spot-description-text">
                            {oneSpotRes?.description}
                        </div>
                    </div>


                </div>
                <div className="right-description-container">
                    <div className="price-and-review-container">
                        <div className="price-number">{`$${oneSpotRes.price}`}<span className="per-night-span">&nbsp;/ night</span></div>
                        <div>
                            {currentUser && oneSpotRes.Owner.id !== currentUser.id && (!userAlreadyReviewed) && (
                                <UserNewReviewModal setHasSubmitted={setHasSubmitted} />
                            )}
                        </div>
                        <div className="cant-review-warning">
                            { (currentUser && oneSpotRes?.Owner?.id === currentUser?.id) ? "*Can't review a spot you own!" : null }
                            { (currentUser && userAlreadyReviewed) ? "*Can't review a spot you already reviewed!" : null}
                        </div>
                    </div>

                    <div className="feature-coming-soon">
                        Booking Feature Below Coming Soon!
                    </div>
                </div>

            </div>

            <div className="all-reviews-for-spot">
                        <SpotReviews spotId={spotId} />
                    </div>
        </div>
    )
}

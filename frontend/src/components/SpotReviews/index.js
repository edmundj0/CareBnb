import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews } from "../../store/reviews";
import './SpotReviews.css';

export default function SpotReviews({ spotId }) {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    const allSpotReviews = useSelector(state => state.review.spotReviews)
    const currentUser = useSelector(state => state.session.user)
    console.log(allSpotReviews, 'allSpotReviews')

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
        .then(() => setIsLoaded(true))
    }, [dispatch, spotId])


    const allSpotReviewsArr = Object.values(allSpotReviews)
    console.log(allSpotReviewsArr, 'ARRAY')

    return isLoaded && (
        <>
            <h3>Reviews</h3>
            <div>
                {allSpotReviewsArr?.length > 0 ? (allSpotReviewsArr.map(review => {
                    return <div key={`review ${review.id}`} className="review-total-container">
                        <div className="review-header-container">
                            <div className="review-first-name">{review?.User?.firstName} {review.User.id === currentUser?.id && <span>(You)</span>}</div>
                            <div className="review-stars">{review?.stars}★</div>
                        </div>
                        <div className="review-date">{review ? (review.createdAt ? review?.createdAt?.slice(0, 10) : null) : null}</div>
                        <div>{review?.review}</div>
                    </div>
                })) : <div>No Reviews Available for this Spot Yet</div>}
            </div>
        </>
    )
}

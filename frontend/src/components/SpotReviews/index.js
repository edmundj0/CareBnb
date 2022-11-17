import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews } from "../../store/reviews";

export default function SpotReviews({ spotId }) {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    const allSpotReviews = useSelector(state => state.review.spotReviews)
    console.log(allSpotReviews, 'allSpotReviews')

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
            .then(() => setIsLoaded(true))
    }, [dispatch, spotId])

    const allSpotReviewsArr = Object.values(allSpotReviews)
    console.log(allSpotReviewsArr, 'ARRAY')

    return isLoaded && (
        <div>
            {allSpotReviewsArr?.length > 0 ? (allSpotReviewsArr.map(review => {
                return <div key={`review ${review.id}`} className="review-total-container">
                    <div>{review?.User?.firstName}</div>
                    <div>{review ? (review.createdAt ? review?.createdAt?.slice(0, 10) : null) : null}</div>
                    <div>{review?.review}</div>
                </div>
            })) : <div>No Reviews Available for this Spot Yet</div>}
        </div>
    )
}

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews } from "../../store/reviews";

export default function SpotReviews({spotId}) {
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
            {allSpotReviewsArr.map(review=>{
                return <div key={`review ${review.id}`}>
                    <div>{review.User.firstName}</div>
                    <div></div>
                </div>
            })}
        </div>
    )
}

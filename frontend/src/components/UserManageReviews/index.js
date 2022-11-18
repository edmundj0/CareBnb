import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { deleteReview, getUserReviews } from "../../store/reviews";
import './UserManageReviews.css'

export default function UserManageReviews() {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    // const state = useSelector(state=> state)
    const userReviews = useSelector(state => state.review.userReviews)
    const currentUser = useSelector(state => state.session.user)

    // console.log(state, 'stateeee')
    console.log(userReviews, 'user reviewsssssss')

    useEffect(() => {
        dispatch(getUserReviews())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    if (!currentUser) {
        return <Redirect to='/' />
    }


    //turn object into array
    const userReviewsArr = Object.values(userReviews).filter((review) => review.userId == currentUser.id)



    return (isLoaded && (
        <div>
            <h2>Manage My Reviews</h2>
            {userReviewsArr.length < 1 && (<span>No reviews yet...</span>)}
            {userReviewsArr.length > 0 && (
                <div className="review-container">
                    {userReviewsArr.map((review) => {
                        console.log(review, 'review objectttttttt')
                        return (
                            <div className='user-review-outer-container' key={`review ${review.id}`}>
                                <div className="user-review-left-container">
                                    <div className="review-name-text">{review?.Spot?.name}</div>
                                    <div className="review-location-text">{review?.Spot?.address}, {review?.Spot?.city}, {review?.Spot?.state}</div>
                                    <div className="review-description-text">{review?.review}</div>
                                </div>
                                <div className="user-review-right-container">
                                    <div>★ {review?.stars}</div>
                                    <button className="user-delete-review"
                                        onClick={() => dispatch(deleteReview(review.id))}>Delete Review
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
    )

}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserReviews } from "../../store/reviews";

export default function UserManageReviews() {
    const dispatch = useDispatch()
    // const state = useSelector(state=> state)
    const userReviews = useSelector(state => state.review.userReviews)
    const currentUser = useSelector(state => state.session.user)

    // console.log(state, 'stateeee')
    console.log(userReviews, 'user reviewsssssss')

    useEffect(() => {
        dispatch(getUserReviews())
    }, [dispatch])

    if(!currentUser){
        return <Redirect to='/' />
    }


    //turn object into array
    const userReviewsArr = Object.values(userReviews).filter((review) => review.userId == currentUser.id)



    return (
        <div>
            <h2>Manage My Reviews</h2>
            {userReviewsArr.length < 1 && (<span>No reviews yet...</span>)}
            {userReviewsArr.length > 0 && (
                <div>
                    {userReviewsArr.map((review) => {
                        console.log(review, 'review objectttttttt')
                        return (
                            <div className='user-review-outer-container' key={`review ${review.id}`}>
                                <div>{review?.Spot?.name}</div>
                                <div>{review?.Spot?.address}, {review?.Spot?.city}, {review?.Spot?.state}</div>
                                {review.review}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )

}

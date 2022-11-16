import { csrfFetch } from "./csrf";

const GET_ALL_USER_REVIEWS = "/reviews/GET_ALL_USER_REVIEWS";
const CREATE_REVIEW = "spots/CREATE_REVIEW";

//action creators
const loadUserReviews = (userRevs) => ({
    type: GET_ALL_USER_REVIEWS,
    userRevs
})

const createReview = (addedReview) => ({
    type: CREATE_REVIEW,
    addedReview
})

//thunks

//read
export const getUserReviews = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews/current')
    if(response.ok) {
        const res = await response.json()
        dispatch(loadUserReviews(res))
    }
}

//create
export const postReview = (info, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })

    if(response.ok) {
        const newReview = await response.json()
        dispatch(createReview(newReview))
        return newReview
    }
}





//reducer

const initialState = { userReviews: {}, spotReviews: {}};
const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_USER_REVIEWS:
            newState = {
                ...state,
                userReviews: { ...state.userReviews},
                spotReviews: { ...state.spotReviews}
            }
            action.userRevs.Reviews.forEach(review => {
                newState.userReviews[review.id] = review
            })
            console.log(newState, 'newState reviews')
            return newState
        case CREATE_REVIEW:
            newState = {...state, userReviews: {...state.userReviews}, spotReviews: {...state.spotReviews}}
            console.log(action.addedReview, 'action.addedReview')
            newState.spotReviews[action.addedReview.id] = action.addedReview
            newState.userReviews[action.addedReview.id] = action.addedReview
            return newState
        default:
            return state;
    }
}


export default reviewsReducer;

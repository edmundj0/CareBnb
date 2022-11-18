import { csrfFetch } from "./csrf";

const GET_ALL_USER_REVIEWS = "/reviews/GET_ALL_USER_REVIEWS";
const GET_ALL_SPOT_REVIEWS = "/reviews/GET_ALL_SPOT_REVIEWS";
const CREATE_REVIEW = "/reviews/CREATE_REVIEW";
const DELETE_REVIEW = "/reviews/DELETE_REVIEW"

//action creators
const loadUserReviews = (userRevs) => ({
    type: GET_ALL_USER_REVIEWS,
    userRevs
})

const loadSpotReviews = (spotRevs) => ({
    type: GET_ALL_SPOT_REVIEWS,
    spotRevs
})

const createReview = (addedReview) => ({
    type: CREATE_REVIEW,
    addedReview
})

const delReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
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

//read
export const getSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(response.ok) {
        const res = await response.json()
        dispatch(loadSpotReviews(res))
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
        dispatch(getSpotReviews(spotId))
        return newReview
    }
}

//delete
export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if(response.ok) {
        dispatch(delReview(reviewId))
    }
}





//reducer

const initialState = { userReviews: {}, spotReviews: {}};
const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_USER_REVIEWS:
            let userAllReviewsReturnObj = {}
            newState = {
                ...state,
                userReviews: {},
                spotReviews: { ...state.spotReviews}
            }
            // action.userRevs.Reviews.forEach(review => {
            //     newState.userReviews[review.id] = review
            // })
            action.userRevs.Reviews.forEach(review => {
                userAllReviewsReturnObj[review.id] = review
            })
            newState.userReviews = userAllReviewsReturnObj
            console.log(newState, 'newState reviews')
            return newState
        case CREATE_REVIEW:
            newState = {...state, userReviews: {...state.userReviews}, spotReviews: {...state.spotReviews}}
            console.log(action.addedReview, 'action.addedReview')
            newState.spotReviews[action.addedReview.id] = action.addedReview
            newState.userReviews[action.addedReview.id] = action.addedReview
            return newState
        case GET_ALL_SPOT_REVIEWS:
            let spotAllReviewsReturnObj = {}
            // newState = {...state, userReviews: {...state.userReviews}, spotReviews: {...state.spotReviews}}
            newState = {...state, userReviews: {...state.userReviews}, spotReviews: {}}
            action.spotRevs.Reviews.forEach(review => {
                spotAllReviewsReturnObj[review.id] = review
            })
            newState.spotReviews = spotAllReviewsReturnObj
            return newState;
        case DELETE_REVIEW:
            newState = {...state, userReviews: {...state.userReviews}, spotReviews: {}}
            delete newState.userReviews[action.reviewId]
            return newState
        default:
            return state;
    }
}


export default reviewsReducer;

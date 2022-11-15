import { csrfFetch } from "./csrf";

const GET_ALL_USER_REVIEWS = "/reviews/GET_ALL_USER_REVIEWS";

//action creators
const loadUserReviews = (userRevs) => ({
    type: GET_ALL_USER_REVIEWS,
    userRevs
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
        default:
            return state;
    }
}


export default reviewsReducer;

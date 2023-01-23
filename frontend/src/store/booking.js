import { csrfFetch } from "./csrf";

const GET_ALL_USER_BOOKINGS = "/bookings/GET_ALL_USER_BOOKINGS"

//action creators
const loadUserBookings = (userBooked) => ({
    type: GET_ALL_USER_BOOKINGS,
    userBooked
})


//thunks



export const getUserBookings = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings/current')
    if(response.ok) {
        const res = await response.json()
        dispatch(loadUserBookings(res))
    }
}



//reducer
const initialState = {userBookings: {}, spotBookings: {}, singleBooking: {}}
const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_USER_BOOKINGS:
            newState = {
                ...state,
                userBookings: {},
                spotBookings: {...state.spotBookings},
                singleBooking: {...state.singleBooking}
            }
            action.userBooked.Bookings.forEach(booking => {
                newState.userBookings[booking.id] = booking
            })
            return newState
        default:
            return state;
    }
}

export default bookingsReducer;

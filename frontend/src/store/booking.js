import { csrfFetch } from "./csrf";

const GET_ALL_USER_BOOKINGS = "/bookings/GET_ALL_USER_BOOKINGS"
const CREATE_NEW_BOOKING = "/bookings/CREATE_NEW_BOOKING"

//action creators
const loadUserBookings = (userBooked) => ({
    type: GET_ALL_USER_BOOKINGS,
    userBooked
})

const postBooking = (newBooking) => ({
    type: CREATE_NEW_BOOKING,
    newBooking
})


//thunks

export const getUserBookings = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings/current')
    if(response.ok) {
        const res = await response.json()
        dispatch(loadUserBookings(res))
    }
}

export const createNewBooking = (info, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })

    if (response.ok) {
        const newBooking = await response.json()
        dispatch(postBooking(newBooking))
        return newBooking
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
        case CREATE_NEW_BOOKING:
            newState = {
                ...state,
                userBookings: {},
                spotBookings: {...state.spotBookings},
                singleBooking: {...state.singleBooking}
            }
            newState.userBookings[action.newBooking.id] = action.newBooking
            return newState
        default:
            return state;
    }
}

export default bookingsReducer;

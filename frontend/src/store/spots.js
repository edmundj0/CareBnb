import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
const GET_ONE_SPOT = "spots/GET_ONE_SPOT";
const EDIT_SPOT = "spots/EDIT_SPOT";


//action creators
const loadSpots = (allSpots) => ({
    type: GET_ALL_SPOTS,
    allSpots
})

const loadOneSpot = (oneSpot) => ({
    type: GET_ONE_SPOT,
    oneSpot
})

const editSpot = (editedSpot) => ({
    type: EDIT_SPOT,
    editedSpot
})


//thunks
export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')
    if (response.ok) {
        const res = await response.json()
        dispatch(loadSpots(res))
    }
}

export const getOneSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const res = await response.json()
        dispatch(loadOneSpot(res))
    }
}

export const putSpot = (info, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
    })
    if (response.ok) {
        const edited = await response.json()
        dispatch(editSpot(edited))
    }
}



//reducer
const initialState = {individualSpot: {}};
const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_SPOTS:
            newState = { ...state }

            action.allSpots.Spots.forEach(spot => {
                newState[spot.id] = spot
            })
            return newState
        case GET_ONE_SPOT:
            // console.log(action, 'action')
            newState = { ...state, individualSpot: {...state.individualSpot} }
            newState.individualSpot = action.oneSpot
            console.log(newState, 'newState')
            return newState
        case EDIT_SPOT:
            console.log(state, 'THISISTHESTATE')
            newState = { ...state, individualSpot: {...state.individualSpot}}
            newState.individualSpot = action.editedSpot
            newState[action.editedSpot.id] = action.editedSpot //reflect update in newState for all spots
            return newState
        default:
            return state;
    }
}


export default spotsReducer;

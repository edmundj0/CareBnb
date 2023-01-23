import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
const GET_ONE_SPOT = "spots/GET_ONE_SPOT";
const EDIT_SPOT = "spots/EDIT_SPOT";
const CREATE_SPOT = "spots/CREATE_SPOT";
const DELETE_SPOT = "/spots/DELETE_SPOT";

const ADD_IMG = "/spots/ADD_IMG"


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

const createSpot = (addedSpot) => ({
    type: CREATE_SPOT,
    addedSpot
})

const delSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

const addImg = (imgInfo, newSpotInfo) => ({
    type: ADD_IMG,
    imgInfo,
    newSpotInfo
})


//thunks

//read
export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')
    if (response.ok) {
        const res = await response.json()
        dispatch(loadSpots(res))
    }
}

//read
export const getOneSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const res = await response.json()
        dispatch(loadOneSpot(res))
    }
}

//edit spot (update)
export const putSpot = (info, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
    })
    if (response.ok) {
        const edited = await response.json()
        dispatch(editSpot(edited))
        return edited
    }
}

//create spot
export const postSpot = (info) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
    })


    if (response.ok) {
        const newSpot = await response.json()
        dispatch(createSpot(newSpot))

        const { imgUrl } = info
        if (imgUrl) {
            const imageResponse = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: imgUrl,
                    preview: true
                })
            })
            if (imageResponse.ok) {
                const imgData = await imageResponse.json()
                dispatch(addImg(imgData, newSpot))
            }
        }

        return newSpot
    }


}

//delete spot
export const deleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        console.log(response)
        console.log(await response.json())
        dispatch(delSpot(spotId))

    }
}



//reducer
const initialState = { individualSpot: {}, aggregateSpots: {} };
const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_SPOTS:
            newState = {
                ...state,
                individualSpot: { ...state.individualSpot },
                aggregateSpots: { ...state.aggregateSpots }
            }

            action.allSpots.Spots.forEach(spot => {
                newState.aggregateSpots[spot.id] = spot
            })
            return newState
        case GET_ONE_SPOT:
            //need to override nested objects to generate new references in memory
            newState = { ...state, individualSpot: { ...state.individualSpot }, aggregateSpots: { ...state.aggregateSpots } }
            newState.individualSpot = action.oneSpot
            return newState
        case EDIT_SPOT:
            newState = { ...state, individualSpot: { ...state.individualSpot }, aggregateSpots: { ...state.aggregateSpots } }
            newState.individualSpot = action.editedSpot
            newState.aggregateSpots[action.editedSpot.id] = action.editedSpot //reflect update in newState for all spots
            return newState
        case CREATE_SPOT:
            newState = { ...state, individualSpot: { ...state.individualSpot }, aggregateSpots: { ...state.aggregateSpots } }
            newState.aggregateSpots[action.addedSpot.id] = action.addedSpot
            newState.individualSpot = action.addedSpot
            return newState
        case DELETE_SPOT:
            newState = { ...state, individualSpot: { ...state.individualSpot }, aggregateSpots: { ...state.aggregateSpots } }

            delete newState.aggregateSpots[action.spotId]
            return newState
        case ADD_IMG:
            newState = { ...state, individualSpot: { ...state.individualSpot }, aggregateSpots: { ...state.aggregateSpots } }
            newState.aggregateSpots[action.newSpotInfo.id].previewImage = action.imgInfo.url
            return newState
        default:
            return state;
    }
}


export default spotsReducer;

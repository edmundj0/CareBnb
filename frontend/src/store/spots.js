const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
const GET_ONE_SPOT = "spots/GET_ONE_SPOT";


//action creators
const loadSpots = (allSpots) => ({
    type: GET_ALL_SPOTS,
    allSpots
})

const loadOneSpot = (oneSpot) =>({
    type: GET_ONE_SPOT,
    oneSpot
})


//thunks
export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')
    if(response.ok){
        const res = await response.json()
        dispatch(loadSpots(res))
    }
}

export const getOneSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)
    if(response.ok){
        const res = await response.json()
        dispatch(loadOneSpot(res))
    }
}



//reducer
const initialState = {};
const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_SPOTS:
            newState = {...state}

            action.allSpots.Spots.forEach(spot => {
                newState[spot.id] = spot
            })
            return newState
        case GET_ONE_SPOT:
            console.log(action, 'action')
            newState = {...state}
            newState.individualSpot = {}
            newState.individualSpot = action.oneSpot
            console.log(newState, 'newState')
            return newState
        default:
            return state;
    }
}


export default spotsReducer;

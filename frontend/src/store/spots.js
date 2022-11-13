const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";


//action creators
const loadSpots = (allSpots) => ({
    type: GET_ALL_SPOTS,
    allSpots
})

//thunks
export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')
    if(response.ok){
        const res = await response.json()
        dispatch(loadSpots(res))
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

            console.log(newState, 'newState')
            return newState
        default:
            return state;
    }
}


export default spotsReducer;

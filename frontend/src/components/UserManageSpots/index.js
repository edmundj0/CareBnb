import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllSpots } from "../../store/spots"
import LoginFormModal from "../LoginFormModal"
import './UserManageSpots.css'

export default function UserManageSpots() {
    const dispatch = useDispatch()
    const allSpots = useSelector(state => state.spot)
    const currentUser = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if(!currentUser){
        return (
            <div>
            <div>Please login to continue</div>
            <NavLink to="/">
                Return Home
            </NavLink>
            <LoginFormModal />
            </div>
        )
    }


    //filter returns empty array if none pass test
    const userSpotsArr = Object.values(allSpots).filter((spot) => spot.ownerId === currentUser.id)



    return (
    <div>
    <h1 id='h1-header'>Manage My Spots</h1>
    <button>Host New Spot</button>
        <div className='user-spots-total-container'>
            {userSpotsArr.map((spot) => {
                return (
                    <div className='user-spot-outer-container' key={`spot ${spot.id}`}>
                        <NavLink to={`/spots/${spot.id}`}>
                            <div className='user-spot-container'>
                                <img src={spot.previewImage} alt="preview" className="user-spot-image" key={`img ${spot.previewImage}`}></img>
                            </div>
                        </NavLink>
                        <div>{spot.name}</div>
                        <NavLink to={`/about-me/spots/${spot.id}/edit`}>
                        <button id='user-edit-button'>Edit this Spot</button>
                        </NavLink>
                        <button id='user-delete-button'>Delete this Spot</button>
                    </div>
                )
            })}
        </div>
    </div>

    )
}

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Redirect } from "react-router-dom"
import { deleteSpot, getAllSpots } from "../../store/spots"
import LoginFormModal from "../LoginFormModal"
import './UserManageSpots.css'

export default function UserManageSpots() {
    const dispatch = useDispatch()
    const allSpots = useSelector(state => state.spot.aggregateSpots)
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])


    if (!currentUser) return <Redirect to="/" />


    //filter returns empty array if none pass test
    const userSpotsArr = Object.values(allSpots).filter((spot) => spot.ownerId === currentUser.id)



    return (
        <div>
            <h1 id='h1-header'>Manage My Spots</h1>
            <div className='user-spots-total-container'>
                {userSpotsArr.length > 0 ? (userSpotsArr.map((spot) => {
                    return (
                        <div className='user-spot-outer-container' key={`spot ${spot.id}`}>
                            <NavLink to={`/spots/${spot.id}`}>
                                <div className='user-spot-container'>
                                    <img src={spot.previewImage} alt="Pic Not Available" className="user-spot-image" key={`img ${spot.previewImage}`}></img>
                                </div>
                            </NavLink>
                            <div className="spot-name-edit">{spot.name}</div>
                            <div className="spot-price-edit">${spot.price}/night</div>
                            <NavLink to={`/about-me/spots/${spot.id}/edit`}>
                                <button id='user-edit-button'>Edit this Spot</button>
                            </NavLink>
                            <button id='user-delete-button'
                                onClick={() => dispatch(deleteSpot(spot.id))}
                            >Delete this Spot</button>
                        </div>
                    )
                })) :
                    <div>You currently don't host any spots. Get started today!</div>
                }
            </div>
        </div>

    )
}

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { getUserBookings } from "../../store/booking";
import './UserManageBookings.css'

export default function UserManageBookings() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const userBookings = useSelector(state => state.booking.userBookings)
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getUserBookings()).then(() => setIsLoaded(true))
    }, [dispatch])

    if (!currentUser) return <Redirect to="/" />

    const userBookingsArr = Object.values(userBookings)
    console.log(userBookingsArr)

    return (isLoaded && (
        <div>
            <h2 className="manage-bookings-header">Manage My Bookings</h2>
            <div className="bookings-entire-container">
            {userBookingsArr.length > 0 ? (userBookingsArr.map(booking => {
                return (
                    <NavLink to={`/spots/${booking.Spot.id}`} key={`booking ${booking.id}`} className="each-booking-container" style={{textDecoration: 'none', color: "black"}}>
                        <div className="each-booking-left-container">
                            <div className="each-booking-name">{booking.Spot.name}</div>
                            <div className="each-booking-dates">{booking.startDate} - {booking.endDate}</div>
                            <div className="each-booking-address">{booking.Spot.address}</div>
                            <div className="each-booking-location">{booking.Spot.city}, {booking.Spot.state}</div>
                        </div>
                        <div className="each-booking-right-container">
                            <img src={booking.Spot.previewImg} alt='spot' className="each-booking-img"></img>
                        </div>
                    </NavLink>
                )
            })) : <div>No bookings yet</div>}
            </div>
        </div>
    )
    )
}

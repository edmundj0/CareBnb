import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
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
                    <div key={`booking ${booking.id}`} className="each-booking-container">
                        <div className="each-booking-left-container">
                            <div>{booking.Spot.name}</div>
                            <div>{booking.startDate} - {booking.endDate}</div>
                            <div>{booking.Spot.address}</div>
                            <div>{booking.Spot.city}, {booking.Spot.state}</div>
                        </div>
                        <div className="each-booking-right-container">

                        </div>
                    </div>
                )
            })) : <div>No bookings yet</div>}
            </div>
        </div>
    )
    )
}

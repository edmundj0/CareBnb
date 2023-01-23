import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserBookings } from "../../store/booking";

export default function UserManageBookings() {
    const dispatch = useDispatch()
    const userBookings = useSelector(state => state.booking.userBookings)
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getUserBookings())
    }, [])

    if (!currentUser) return <Redirect to="/" />

    const userBookingsArr = Object.values(userBookings)

    return (
        <div>
            <h1>Manage My Bookings</h1>
            {userBookingsArr.length > 0 ? (userBookingsArr.map(booking => {
                return (
                    <div key={`booking ${booking.id}`}>
                        {booking}
                    </div>
                )
            })) : <div>No bookings yet</div>}
        </div>
    )
}

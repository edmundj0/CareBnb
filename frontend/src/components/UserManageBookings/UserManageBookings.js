import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { deleteBooking, getUserBookings } from "../../store/booking";
import { toast } from 'react-toastify';
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

    const userBookingsArrUnsorted = Object.values(userBookings)

    const userBookingsFuture = userBookingsArrUnsorted.filter(booking => new Date().toISOString().split('T')[0] < booking.startDate)
    const userBookingsPast = userBookingsArrUnsorted.filter(booking => new Date().toISOString().split('T')[0] >= booking.startDate) //consider booking that starts today as past

    userBookingsFuture.sort((a, b) => a.startDate < b.startDate ? -1 : 1)
    userBookingsPast.sort((a, b) => a.startDate > b.startDate ? -1 : 1)
    // console.log(userBookingsFuture, 'future')
    // console.log(userBookingsPast, 'past')
    // console.log(userBookingsArrUnsorted)


    // const userBookingsArr = userBookingsArrUnsorted.sort(function (a, b) {
    //     let x = a.startDate < b.startDate ? -1 : 1;
    //     return x
    // })

    const handleDelete = (booking) => {
        dispatch(deleteBooking(booking.id)).then((res) => {
            if (res.statusCode === 200) {
                toast.success("Booking deleted successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                })
            } else {
                toast.error("Error deleting. Please try again later.")
            }
        })
    }

    return (isLoaded && (
        <div>
            <h2 className="manage-bookings-header">Manage My Bookings</h2>
            <div className="bookings-entire-container">
                <h4>Upcoming Bookings</h4>
                {userBookingsFuture.length > 0 ? (userBookingsFuture.map(booking => {
                    return (
                        <div className="each-booking-include-nav-container" key={`booking ${booking.id}`}>
                            <NavLink to={`/spots/${booking.Spot.id}`} className="each-booking-container" style={{ textDecoration: 'none', color: "black" }}>
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
                            {new Date().toISOString().split('T')[0] < booking.startDate ? <button className="delete-booking-button" onClick={() => handleDelete(booking)}><i className="fa-solid fa-trash-can"></i></button> : null}
                            {/* only show delete button if trip is in the future */}
                        </div>
                    )
                })) : <div>No bookings yet</div>}
                <h4>Past and Ongoing Bookings</h4>
                {userBookingsPast.length > 0 ? (userBookingsPast.map(booking => {
                    return (
                        <div className="each-booking-include-nav-container" key={`booking ${booking.id}`}>
                            <NavLink to={`/spots/${booking.Spot.id}`} className="each-booking-container" style={{ textDecoration: 'none', color: "black" }}>
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
                            {/* {new Date().toISOString().split('T')[0] < booking.startDate ? <button className="delete-booking-button" onClick={() => dispatch(deleteBooking(booking.id))}><i className="fa-solid fa-trash-can"></i></button> : null}
                    only show delete button if trip is in the future */}
                        </div>
                    )
                })) : <div>No bookings yet</div>}
            </div>
        </div>
    )
    )
}

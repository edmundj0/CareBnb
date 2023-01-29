import { useEffect, useRef, useState } from 'react';
import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewBooking } from '../../../store/booking';
import './Bookings.css'

export default function Bookings({ spotId, oneSpotRes }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [showCalendar, setShowCalendar] = useState(false)
    const [startDate, setStartDate] = useState("") //stored as format ready to send to backend
    const [endDate, setEndDate] = useState("")
    const [errors, setErrors] = useState([])

    const [rangesStart, setRangesStart] = useState(new Date())
    const [rangesEnd, setRangesEnd] = useState(new Date())
    const calendarContainer = useRef(null)
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => { //close calendar modal if user clicks outside the ref

        if (!showCalendar) return

        const closeCalendar = (e) => {
            if (!calendarContainer || !calendarContainer.current || !calendarContainer.current.contains(e.target)) {
                setShowCalendar(false)
            }
        }

        document.addEventListener('click', closeCalendar)

        return () => {
            document.removeEventListener('click', closeCalendar)
            console.log('cleanup running')
        }


    }, [showCalendar, calendarContainer.current])


    //required props for react-date-range
    const selectionRange = {
        startDate: rangesStart,
        endDate: rangesEnd,
        key: 'selection',
    }
    const handleSelect = (ranges) => {
        console.log(ranges)
        setStartDate(dateConvertForDispatch(ranges.selection.startDate))
        setEndDate(dateConvertForDispatch(ranges.selection.endDate))
        setRangesStart(ranges.selection.startDate)
        setRangesEnd(ranges.selection.endDate)
    }

    const dateConvertForDispatch = (date) => {

        date = date.toISOString().split('T')[0]
        // date = date.toDateString()

        return date

    }

    const displayDateFromDispatch = (date) => {
        // const key = { 'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12 }

        const key = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec' }

        if (date.slice(5, 7) in key) {
            const newDate = `${key[date.slice(5, 7)]} ${date.slice(8, 10)} ${date.slice(0, 4)}`
            return newDate
        }

        return date
    }

    const info = {
        startDate: startDate,
        endDate: endDate
    }

    const handleSubmit = async (e) => {
        e.preventDefault()


        //have to use .catch b/c csrfFetch "throws" error if statusCode > 400
        //"throws" error instead of "return" in csrf.js
        const newBooking = await dispatch(createNewBooking(info, spotId))
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })

        if (newBooking) {
            setErrors([])

            history.push("/about-me/bookings")
        }

    }



    return (
        <div>
            {oneSpotRes?.Owner?.id !== currentUser.id ?
                (<div className='booking-entire-container'>
                    <h4>Make a Reservation</h4>
                    <div>
                        {errors && (
                            <ul className="booking-errors">
                                {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                        )}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='checkin-out-container'>
                            <div className='checkin-out-inner-left-container'>
                                <div className='checkin-out-text'>CHECK IN</div>
                                <input
                                    placeholder='Select A Date'
                                    onClick={() => {setShowCalendar(showCalendar => !showCalendar); setErrors([])}}
                                    value={displayDateFromDispatch(startDate)}
                                    className="checkin-out-input"
                                    readOnly>
                                </input>
                            </div>
                            <div className='checkin-out-inner-right-container'>
                                <div className='checkin-out-text'>CHECK OUT</div>
                                <input
                                    placeholder='Select A Date'
                                    onClick={() => {setShowCalendar(showCalendar => !showCalendar); setErrors([])}}
                                    value={displayDateFromDispatch(endDate)}
                                    className="checkin-out-input"
                                    readOnly>
                                </input>
                            </div>
                        </div>
                        {showCalendar &&
                            <div className='booking-calendar-modal ' ref={calendarContainer}>
                                <DateRange
                                    ranges={[selectionRange]}
                                    rangeColors={["#95bb72"]}
                                    onChange={handleSelect}
                                    showDateDisplay={false}
                                    months={2}
                                    minDate={new Date()}
                                    direction="horizontal"
                                    preventSnapRefocus={true}
                                />
                                <div><button onClick={() => setShowCalendar(false)}>Ok</button></div>
                            </div>
                        }
                        {currentUser ? <div><button type='submit' className='reserve-booking-button'>Reserve</button></div> : <div><button type='submit' disabled className='reserve-booking-button-disabled'>Login to Book</button></div>}
                        {startDate ? <div className='no-charge-text'>You won't be charged yet</div> : <div>Select Dates to View Est. Cost</div>}
                    </form>
                    {startDate && <div className='price-calculation-container'>
                        <div className='price-calculation-row'>
                            <span>${oneSpotRes.price}/night * {(rangesEnd.getTime() - rangesStart.getTime()) / (1000 * 3600 * 24)} nights</span>
                            <span>${oneSpotRes.price * (rangesEnd.getTime() - rangesStart.getTime()) / (1000 * 3600 * 24)} </span>
                        </div>
                        <div className='price-calculation-row'><span>Cleaning Fee</span><span>$65</span></div>
                        <div className='price-calculation-row'><span>Service Fee</span><span>$35</span></div>
                        <div className='price-calculation-row price-calculation-total'><span>Total:</span><span>${100 + oneSpotRes.price * (rangesEnd.getTime() - rangesStart.getTime()) / (1000 * 3600 * 24)}</span></div>

                    </div>
                    }
                </div>)
                : <div>Can't book a spot you own!</div>}
        </div>
    )
}

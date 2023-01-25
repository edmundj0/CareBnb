import { useEffect, useRef, useState } from 'react';
import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useDispatch } from 'react-redux';
import { createNewBooking } from '../../../store/booking';
import './Bookings.css'

export default function Bookings({ spotId }) {
    const dispatch = useDispatch()
    const [showCalendar, setShowCalendar] = useState(false)
    const [startDate, setStartDate] = useState("") //stored as format ready to send to backend
    const [endDate, setEndDate] = useState("")
    const [errors, setErrors] = useState([])

    const [rangesStart, setRangesStart] = useState(new Date())
    const [rangesEnd, setRangesEnd] = useState(new Date())
    const calendarContainer = useRef(null)

    useEffect(() => { //close calendar modal if user clicks outside the ref

        if (!showCalendar) return

        const closeCalendar = (e) => {
            if(!calendarContainer || !calendarContainer.current || !calendarContainer.current.contains(e.target)) {
                setShowCalendar(false)
            }
        }

        document.addEventListener('click', closeCalendar)

        return () => {
            document.removeEventListener('click', closeCalendar)
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

        const key = {'01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'}

        if (date.slice(5,7) in key) {
            const newDate = `${key[date.slice(5,7)]} ${date.slice(8,10)} ${date.slice(0,4)}`
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
        }

    }



    return (
        <div className='booking-entire-container'>
            <div>
                {errors && (
                    <ul className="booking-errors">
                        {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='Check In'
                    onClick={() => setShowCalendar(showCalendar => !showCalendar)}
                    value={displayDateFromDispatch(startDate)}
                    readOnly>
                </input>
                <input
                    placeholder='Check Out'
                    onClick={() => setShowCalendar(showCalendar => !showCalendar)}
                    value={displayDateFromDispatch(endDate)}
                    readOnly>
                </input>
                {showCalendar &&
                    <div className='booking-calendar-modal ' ref={calendarContainer}>
                        <DateRange
                            ranges={[selectionRange]}
                            onChange={handleSelect}
                            showDateDisplay={false}
                            months={2}
                            minDate={new Date()}
                            direction="horizontal"
                        />
                    </div>
                }
                <button type='submit'>Reserve</button>
            </form>
        </div>
    )
}

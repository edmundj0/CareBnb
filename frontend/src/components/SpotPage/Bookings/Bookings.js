import { useState } from 'react';
import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useDispatch } from 'react-redux';
import { createNewBooking } from '../../../store/booking';
import './Bookings.css'

export default function Bookings({ spotId }) {
    const dispatch = useDispatch()
    const [showCalendar, setShowCalendar] = useState(false)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [errors, setErrors] = useState([])

    //required props for react-date-range
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }
    const handleSelect = (ranges) => {
        console.log(ranges)
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const info = {
        startDate: 'filler',
        endDate: 'filler'
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

        if (newBooking){
            setErrors([])
        }

    }



    return (
        <div>
             <div>
                {errors && (
                    <ul className="booking-errors">
                        {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='Choose Start Date'
                    onClick={() => setShowCalendar(showCalendar => !showCalendar)}
                    value={startDate}
                    readOnly>
                </input>
                <input
                    placeholder='Choose End Date'
                    onClick={() => setShowCalendar(showCalendar => !showCalendar)}
                    value={endDate}
                    readOnly>
                </input>
                {showCalendar &&
                    <div className='booking-calendar-modal'>
                        <DateRange
                            ranges={[selectionRange]}
                            onChange={handleSelect}
                            showDateDisplay={false}
                            months={2}
                        />
                    </div>
                }
                <button type='submit'>Reserve</button>
            </form>
        </div>
    )
}

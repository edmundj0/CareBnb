import { useState } from 'react';
import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './Bookings.css'

export default function Bookings() {
    const [showCalendar, setShowCalendar] = useState(false)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

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



    return (
        <div>
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
        </div>
    )
}

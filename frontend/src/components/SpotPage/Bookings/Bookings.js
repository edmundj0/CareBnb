import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function Bookings() {


    //required props for react-date-range
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }
    const handleSelect = (ranges) => {
        console.log(ranges)
    }

    return (
    <DateRangePicker
    ranges={[selectionRange]}
    onChange={handleSelect}

     />
    )
}

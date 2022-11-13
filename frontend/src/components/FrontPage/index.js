import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import './HomePage.css'


export default function HomePage() {
    const dispatch = useDispatch()
    const allSpotsRes = useSelector(state => state.spot)


    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <div>
            <div className='all-spots-total-container'>
                {Object.values(allSpotsRes).map((spot) => {
                    return (
                        <div className='spot-outer-container' key={`spot ${spot.id}`}>
                        <img src={spot.previewImage} alt="preview" className="spot-image"></img>
                            {spot.name}
                        </div>
                    )
                })}
            </div>
            <div>
                test
            </div>
        </div>
    )
}

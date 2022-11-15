import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import './HomePage.css'


export default function HomePage() {
    const dispatch = useDispatch()
    const allSpotsRes = useSelector(state => state.spot.aggregateSpots)


    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <div>
            {/* <div className='all-spots-total-container'>
                {Object.values(allSpotsRes).map((spot) => {
                    return (
                        <div className='spot-outer-container' key={`spot ${spot.id}`}>
                            <NavLink to={`/spots/${spot.id}`}>
                                <div className='spot-container'>
                                    <img src={spot.previewImage} alt="preview" className="spot-image" key={`img ${spot.previewImage}`}></img>
                                    <div className='spot-description-details'>
                                        <div>{spot.city}, {spot.state}</div><span></span>
                                        <div>{spot.name}</div>
                                        <div>{`$${spot.price} USD / night`}</div>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    )
                })}
            </div> */}
            <div className='all-spots-total-container'>
                {Object.values(allSpotsRes).map((spot) => {
                    return (
                        <div className='spot-outer-container' key={`spot ${spot.id}`}>
                            <NavLink to={`/spots/${spot.id}`}>
                                <div className='spot-container'>
                                    <img src={spot.previewImage} alt="preview" className="spot-image" key={`img ${spot.previewImage}`}></img>
                                    <div className='spot-description-details'>
                                        <div>{spot.city}, {spot.state}</div><span></span>
                                        <div>{spot.name}</div>
                                        <div>{`$${spot.price} USD / night`}</div>
                                    </div>
                                </div>
                            </NavLink>
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
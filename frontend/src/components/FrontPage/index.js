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
                            <NavLink to={`/spots/${spot.id}`} style={{textDecoration:'none'}}>
                                <div className='spot-container'>
                                    <img src={spot.previewImage} alt="preview" className="spot-image" key={`img ${spot.previewImage}`}></img>
                                    <div className='spot-description-details'>
                                        <div className="spot-description-first-row">
                                            <div id="city-and-state">{spot.city}, {spot.state}</div>
                                            <div id="rating-text">🌴{spot.avgRating ? Math.round((Number(spot.avgRating) * 100) / 100)?.toFixed(2) : "New"}</div>
                                        </div>
                                        <div id="spot-name-text">{spot.name}</div>
                                        <div id="spot-price-text">{`$${spot.price}`} <span id="night-text">night</span></div>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
            <div>

            </div>
        </div>
    )
}

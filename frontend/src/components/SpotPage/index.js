import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import './SpotPage.css'

export default function SpotPage() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const oneSpotRes = useSelector(state => state.spot.individualSpot)
    console.log(oneSpotRes, 'stateeeeeeeeeee')

    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch])


    if (!oneSpotRes) return (
        <div>
            Error: 404
            Sorry, this spot does not exist
        </div>
    )

    if(!oneSpotRes.SpotImages) return (
        <div>
            Error: 404
            Sorry, this spot does not exist
        </div>
    )

    console.log(oneSpotRes.SpotImages[0], 'oneSpotRes spotImages')

    return (
        <div className="entire-page">
            <div className="title">
                {oneSpotRes.name}
            </div>
            <div className="header-details">
                <span>{`★ ${oneSpotRes.avgStarRating || "No Reviews Yet"}`} </span>
                <span>{`${oneSpotRes.city}, ${oneSpotRes.state}, ${oneSpotRes.country}`}</span>
            </div>
            <div className="all-images-container">
                <div className="main-image-container">
               { oneSpotRes.SpotImages[0] && (<img src={oneSpotRes.SpotImages[0].url} id='main-image' alt="Pic Not Available or Invalid URL"></img>)}
               </div>
               <div className="small-image-container">
               {oneSpotRes.SpotImages[2] && (<img src={oneSpotRes.SpotImages[2].url} className='small-image' alt="Pic Not Available or Invalid URL"></img>)}
               {oneSpotRes.SpotImages[3] && (<img src={oneSpotRes.SpotImages[3].url} className='small-image' alt="Pic Not Available or Invalid URL"></img>)}
               {oneSpotRes.SpotImages[4] && (<img src={oneSpotRes.SpotImages[4].url} className='small-image' alt="Pic Not Available or Invalid URL"></img>)}
               {oneSpotRes.SpotImages[1] && (<img src={oneSpotRes.SpotImages[1].url} className='small-image' alt="Pic Not Available or Invalid URL"></img>)}
               </div>
            </div>
            In development
        </div>
    )
}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";

export default function SpotPage() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const oneSpotRes = useSelector(state => state.spot.individualSpot)
    console.log(oneSpotRes, 'stateeeeeeeeeee')

    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch])

    console.log(spotId)

    if(!oneSpotRes) return (
        <div>
            Error: 404
            Sorry, this spot does not exist
        </div>
    )

    const imageDisplay = (
        Object.values(oneSpotRes.spotImages).map(img => {
            return (
                <img src={`${img.url}`}></img>
            )
        })
    )


    return (
        <div className="entire-page">
            <div className="title">
            {oneSpotRes.name}
            </div>
            <div className="header-details">
                <span>{`★ ${oneSpotRes.avgStarRating || "No Reviews Yet"}`} </span>
                <span>{`${oneSpotRes.city}, ${oneSpotRes.state}, ${oneSpotRes.country}`}</span>
            </div>
            <div className="spot-images">
            {}
            </div>
            In development
        </div>
    )
}

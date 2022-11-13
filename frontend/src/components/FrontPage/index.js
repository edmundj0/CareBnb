import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";


export default function HomePage(){
    const dispatch = useDispatch()
    const allSpotsRes = useSelector(state => state.spot)


    useEffect(() => {
        dispatch(getAllSpots())
    }, [])

    return (
        <div>
        {Object.values(allSpotsRes).map((spot) => {
            return (
                <div>
                    {spot.name}
                </div>
            )
        })}
        <div>
            test
        </div>
        </div>
    )
}

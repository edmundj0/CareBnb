import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import UserNewReviewModal from "../UserNewReviewModal";
import './SpotPage.css'

export default function SpotPage() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const oneSpotRes = useSelector(state => state.spot.individualSpot)
    console.log(oneSpotRes, 'oneSpotRes')

    const currentUser = useSelector(state => state.session.user)
    console.log(currentUser, 'currentUser')

    // const allReviews = useSelector(state => state.review.spotReviews)

    // const test = useSelector(state => state)
    // console.log(test, 'stateeeee')



    let userAlreadyReviewed;



    useEffect(() => {
        dispatch(getOneSpot(spotId))
        .then(() => setIsLoaded(true))
    }, [dispatch, spotId])


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


    return isLoaded && (
        <div className="entire-page">
            <div className="title">
                {oneSpotRes.name}
            </div>
            <div className="header-details">
                <span>{`★ ${oneSpotRes.avgStarRating || "No Reviews Yet"} ·` } </span>
                <span>{`${oneSpotRes.city}, ${oneSpotRes.state}, ${oneSpotRes.country}`}</span>
            </div>
            <div className="all-images-container">
                <div className="main-image-container">
               { oneSpotRes.SpotImages[0] && (<img src={oneSpotRes.SpotImages[0].url} id='main-image' alt="Pic Not Available or Invalid URL"></img>)}
               </div>
               <div className="small-image-container">
               {oneSpotRes.SpotImages[1] && (<img src={oneSpotRes.SpotImages[1].url} className='small-image' id='small-image-1' alt="Pic Not Available or Invalid URL"></img>)}
               {oneSpotRes.SpotImages[2] && (<img src={oneSpotRes.SpotImages[2].url} className='small-image' id='small-image-2' alt="Pic Not Available or Invalid URL"></img>)}
               {oneSpotRes.SpotImages[3] && (<img src={oneSpotRes.SpotImages[3].url} className='small-image' id='small-image-3' alt="Pic Not Available or Invalid URL"></img>)}
               {oneSpotRes.SpotImages[4] && (<img src={oneSpotRes.SpotImages[4].url} className='small-image' id='small-image-4' alt="Pic Not Available or Invalid URL"></img>)}
               </div>
            </div>
            <div className="hosting-information">
            <div id='home-hosted-by'>{`Entire home hosted by ${oneSpotRes.Owner.firstName}`}</div>
            <div id='contact-host'>Contact owner for more information</div>
            </div>
            <div className="price-and-review">
                    <div>
                      <span>{`${oneSpotRes.price}`}</span>
                    </div>
                    <div>
                        {currentUser && oneSpotRes.Owner.id !== currentUser.id && (
                            <UserNewReviewModal />
                        )}
                    </div>
            </div>
            <div className="all-reviews-for-spot">

            </div>
            In development
        </div>
    )
}

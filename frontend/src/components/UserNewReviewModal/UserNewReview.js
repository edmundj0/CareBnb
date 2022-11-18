import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { postReview } from "../../store/reviews";
import './UserNewReview.css';

export default function UserNewReview() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams()

    const currentUser = useSelector(state => state.session.user)

    const [reviewDescription, setReviewDescription] = useState('');
    const [stars, setStars] = useState(1);

    const [errors, setErrors] = useState([]);

    if (!currentUser) return <Redirect to="/" />

    const info = {
        review: reviewDescription,
        stars
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        let newlyCreatedReview = await dispatch(postReview(info, spotId))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })

        if (newlyCreatedReview) {
            setErrors([])
            history.push('/about-me/reviews')
        }
    }




    return (
        <div className="entire-review-create-page">
            <h1>Create New Review</h1>
            <ul>
                {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>

            <form onSubmit={onSubmit} className='form-elements-form'>
                <div className="add-review-form-elements">
                    <div className="review-form-text">Review Description</div>
                    <textarea placeholder="Review Description"
                        type='text'
                        value={reviewDescription}
                        required
                        onChange={e => setReviewDescription(e.target.value)}
                        className="review-form-input review-form-description"
                    />
                </div>
                <div className="add-review-form-elements">
                    <div className="review-form-text">Stars (Enter number from 1-5)</div>
                    <input placeholder="Stars"
                        type='number' min='1' max='5'
                        value={stars}
                        required
                        onChange={e => setStars(e.target.value)}
                        className="review-form-input"
                    />
                </div>
                <div className="add-review-form-elements">
                    <button className="new-review-submit-button" type="submit">Post Review</button>
                </div>
            </form>
        </div>
    )



}

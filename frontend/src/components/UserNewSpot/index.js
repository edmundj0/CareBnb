import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { postSpot } from "../../store/spots";
import './UserNewSpot.css';

export default function UserNewSpot() {

    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [imgUrl, setImgUrl] = useState('');


    const [errors, setErrors] = useState([]);

    const currentUser = useSelector(state => state.session.user)
    if (!currentUser) return <Redirect to="/" />

    const info = {
        name,
        address,
        city,
        state,
        country,
        description,
        price,
        lat: 1,
        lng: 1,
        imgUrl
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        let newlyCreatedSpot = await dispatch(postSpot(info))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })

        if (newlyCreatedSpot) {
            setErrors([])
            history.push('/about-me/spots')
        }

    }


    return (
        <div className='entire-create-page'>
            <h1 className="create-header">Create New Spot</h1>
            <ul>
                {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <form onSubmit={onSubmit} className="create-form">

                    <input placeholder="Spot Name"
                        type={'text'}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="create-form-input"
                    />


                    <input placeholder="Address"
                        type='text'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                        className="create-form-input"
                    />


                    <input placeholder="City"
                        type='text'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                        className="create-form-input"
                    />


                    <input placeholder="State"
                        type='text'
                        value={state}
                        onChange={e => setState(e.target.value)}
                        required
                        className="create-form-input"
                    />


                    <input placeholder="Country"
                        type='text'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        required
                        className="create-form-input"
                    />


                    <input placeholder="Image URL"
                        type='text'
                        value={imgUrl}
                        onChange={e => setImgUrl(e.target.value)}
                        required
                        className="create-form-input"
                    />


                    <div id="price-per-night">&nbsp;Price per night (USD)</div>
                    <input placeholder="Price per Night"
                        id="price"
                        type='number' min='0' step='0.01'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                        className="create-form-input"
                    />


                    <textarea placeholder="Description"
                        type='text'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        className="create-form-input-description"
                    />

                <button className="create-submit-button" type="submit">Host New Spot</button>
            </form>
            <div className="example-url-text">Example Image URL: https://drive.google.com/uc?export=view&id=1c-W-8Ypo7dshsHaQ5GBBYYhy3XvUKGgr</div>

        </div>
    )




}

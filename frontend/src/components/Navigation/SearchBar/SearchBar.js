import { useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import "./SearchBar.css"

export default function SearchBar() {
    const [searchWord, setSearchWord] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const allSpots = useSelector(state => state.spot.aggregateSpots)
    const allSpotsArr = Object.values(allSpots) //will be empty array on first render

    const handleSearch = (e) => {
        const val = e.target.value //searchValue prevents search results from being one character behind due to setState not being synchronous
        setSearchWord(val)

        const res = allSpotsArr.filter((spot) => {
            return (spot.city.toLowerCase().includes(val.toLowerCase()) || spot.state.toLowerCase().includes(val.toLowerCase()) || spot.name.toLowerCase().includes(val.toLowerCase()) || spot.address.toLowerCase().includes(val.toLowerCase()) || spot.country.toLowerCase().includes(val.toLowerCase()))
        })

        console.log(res, 'res')


        if (val === "") {
            setSearchResult([])
        } else {
            setSearchResult(res)
        }

    }

    const clearSearch = () => {
        setSearchWord("")
        setSearchResult([])
    }


    return (
        <div className="search-entire-container">
            <div className="search-input-container">
                <input
                    type="text"
                    placeholder="Search for a Spot"
                    value={searchWord}
                    onChange={handleSearch}
                    className="search-input-box">
                </input>
                {searchWord === "" ? <i className="fa-solid fa-magnifying-glass"></i> : <i className="fa-solid fa-xmark" onClick={clearSearch}></i>}
            </div>
            {searchResult.length > 0 && (
                <div className="search-result-container">
                    {searchResult.slice(0, 10).map(spot => {
                        return (
                            <div key={`searchspot ${spot.id}`}>
                                <NavLink to={`/spots/${spot.id}`} style={{ textDecoration: "none", color: "black" }} onClick={() => { setSearchResult([]); setSearchWord("") }} className="navlink-container-search">
                                    <img id="search-result-img" src={spot.previewImage}></img>
                                    <div className="search-result-text-container">
                                        <div id="search-result-spot-name">{spot.name}</div>
                                        <div id="search-result-location">in {spot.city}, {spot.state}</div>
                                    </div>

                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            )}
            {searchResult.length === 0 && searchWord !== "" && (
                <div className="search-result-container">No Results Found</div>
            )}
        </div>
    )
}

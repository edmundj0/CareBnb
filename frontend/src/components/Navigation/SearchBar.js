import { useState } from "react"
import { useSelector } from "react-redux"

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
        console.log(searchResult, 'searchResult')
        console.log(searchWord, 'searchWord')

        if (val === "") {
            setSearchResult([])
        } else {
            setSearchResult(res)
        }




    }


    return (
        <div>
            <input
                type="text"
                placeholder="Start Search"
                value={searchWord}
                onChange={handleSearch}>
            </input>
            {searchResult.length > 0 && (
                <div className="search-result-container">
                    {searchResult.slice(0, 10).map(spot => {
                        return (
                            <div key={`searchspot ${spot.id}`}>{spot.name}</div>
                        )
                    })}
                </div>
            )}
            {searchResult.length === 0 && searchWord !== "" && (
                <div>No Results Found</div>
            )}
        </div>
    )
}

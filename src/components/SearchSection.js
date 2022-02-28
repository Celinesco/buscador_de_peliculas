import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";

const SearchSection = () => {
    const API_KEY = `65039781e8b8e09c46c6da646de7be01`;
    const BASE_URL = `https://api.themoviedb.org/3/search/movie?`
    
    const [search, setSearch] = useState([])
    const [searchParams, setSearchParams] = useSearchParams({
        title_contains: "",
    });
    const [inputValue, setInputValue] = useState(searchParams.get('title_contains'));

    const handleOnChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        setSearchParams({
            title_contains: inputValue
        })
    }

    useEffect(() => {
        fetch(`${BASE_URL}api_key=${API_KEY}&query=${searchParams.get('title_contains')}`)
        .then(res => res.json())
        .then(data => {
            setSearch(data.results)
            console.log(data)
        })
         
    }, [])


    return (
        <section className="section__search sections__styles">
            <h2>Search</h2>
            <form >
                <label htmlFor="movie-search">Search here!</label>
                <input id="movie-search" type="text" onChange={handleOnChange} value={inputValue}></input>
                <button type="submit" onClick={handleClick}><VscSearch /></button>
            </form>
        </section>
    )
}

export default SearchSection;
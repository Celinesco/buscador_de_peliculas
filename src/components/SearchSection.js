import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";

const SearchSection = () => {

    const [inputValue, setInputValue] = useState("");
    const [search, setSearch] = useState([])
    const [searchParams, setSearchParams] = useSearchParams({
        title_contains: "",
    });

    const handleOnChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        setSearchParams({
            title_contains: inputValue
        })
    }

  


    return (
        <section className="section__search sections__styles">
            <h2>Search</h2>
            <form >
                <label htmlFor="movie-search">Search here!</label>
                <input id="movie-search" type="text" onChange={handleOnChange}  value={inputValue}></input>
                <button type="submit" onClick={handleClick}><VscSearch /></button>
            </form>
        </section>
    )
}

export default SearchSection;
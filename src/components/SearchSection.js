import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const SearchSection = () => {
    return (
        <section className="section__search sections__styles">
            <h2>Search</h2>
            <form>
                <label htmlFor="movie-search">Search here!</label>
                <input id="movie-search" type="text"></input>
            </form>
        </section>
    )
}

export default SearchSection;
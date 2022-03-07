import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
import Card from './Card';
import './SectionSearch.scss';
import posterNotFound from '../assets/posterNotFound.png'
import ButtonPages from "./ButtonPages";
import { API_KEY, URL_BASE, IMG_URL } from "./export_files";

const SearchSection = () => {
    const [search, setSearch] = useState([])
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams({
        title_contains: "Mickey",
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
        fetch(`${URL_BASE}api_key=${API_KEY}&query=${searchParams.get('title_contains')}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setSearch(data.results ? data.results : [])
            
            })
    }, [searchParams, page])


    return (
        <section className="section__search sections__styles">
            <h2>Search</h2>
            <form >
                <label htmlFor="movie-search">Search here!</label>
                <input id="movie-search" type="text" onChange={handleOnChange} value={inputValue}></input>
                <button type="submit" onClick={handleClick}><VscSearch /></button>
            </form>
            <div className="container__results">
                <div className="container__movie-cards">
                    {search.map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id}>
                            <Card
                                title={movie.title}
                                img={movie.poster_path !== null ?
                                    `${IMG_URL}${movie.poster_path}`
                                    : posterNotFound}
                                alt={movie.poster_path !== null
                                    ? `Poster from ${movie.title}`
                                    : `Poster not available`}
                                overview={movie.overview}
                            />
                        </Link>
                    )
                    )}
                   
                </div>
                <ButtonPages 
                 page={page}
                 setPage={setPage}
                />
            </div>

        </section>
    )
}

export default SearchSection;
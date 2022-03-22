import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
import Card from './Card';
import './SectionSearch.scss';
import posterNotFound from '../assets/posterNotFound.png'
import ButtonPages from "./ButtonPages";
import { API_KEY, IMGw300_URL, URL_Search, URL_BASE } from "./export_files";
import backgroundTitleSection from '../assets/backgroundTitleSection.png';

const SearchSection = () => {
    const [search, setSearch] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(500);
    const [optionGenre, setOptionGenre] = useState(false);
    const [optionInput, setOptionInput] = useState(true);
    const [infoEnglish, setInfoEnglish] = useState([]);
    const [genresList, setGenresList] = useState([]);
    const [selectValue, setSelectValue] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams({
        title_contains: "Mickey",
    });

    const inputSearch = useRef()

    const handleClick = (e) => {
        setPage(1)
        e.preventDefault()
        setSearchParams({
            title_contains: inputSearch.current.value
        })
    }
    const handleChange = (e) => {
        setPage(1)
        setSelectValue(e.target.value)
    }

    useEffect(() => {
        if (optionInput) {
            fetch(`${URL_Search}api_key=${API_KEY}&query=${searchParams.get('title_contains')}&language=de&page=${page}`)
                .then(res => res.json())
                .then((data) => {
                    setSearch(data?.results ? data.results : []);
                    data?.total_pages < 500 ? setTotalPages(data.total_pages) : setTotalPages(500)
                })
            fetch(`${URL_Search}api_key=${API_KEY}&query=${searchParams.get('title_contains')}&page=${page}`)
                .then(res => res.json())
                .then(data => {
                    setInfoEnglish(data?.results ? data.results : []);
                })
        }
        if (optionGenre) {
            fetch(`${URL_BASE}discover/movie?api_key=${API_KEY}&language=de-DE&page=${page}&with_genres=${selectValue}`)
                .then(res => res.json())
                .then(data => {
                    data?.results ? setSearch(data.results) : setSearch([])
                    data?.total_pages < 500 ? setTotalPages(data.total_pages) : setTotalPages(500)
                })
        }

    }, [searchParams, page, optionGenre, optionInput, selectValue, totalPages])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=de`)
            .then(res => res.json())
            .then(data => {
                setGenresList(data?.genres)
            })
    }, [])


    const handleNameSearch = () => {
        setOptionGenre(false)
        setOptionInput(true)
    }

    const handleGenreSearch = () => {
        setOptionInput(false)
        setOptionGenre(true)
    }

    return (
        <section className="section__search sections__styles">
            <div className="container__title-background-image">
                <img src={backgroundTitleSection} alt=""></img>
                <div className="container__title-section">
                    <h2>Suche</h2>
                </div>
            </div>
            <div className="container__forms">
                <div className="column__form-button">
                    <button onClick={handleNameSearch}>nach Namen suchen</button>
                    {optionInput &&   <form className="form__search-section">
                        <input ref={inputSearch} type="text" ></input>
                        <button aria-label='nach Namen suchen' type="submit" onClick={handleClick}><VscSearch /></button>
                    </form>}
                </div>
                <div className="column__form-button">
                    <button onClick={handleGenreSearch}>nach Genre suchen </button>
                    {optionGenre && <form className="form__search-section">
                        <select name='genre' onChange={handleChange}>
                            <option value="" >Wähle ein Genre</option>
                            {genresList.map(genre => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))}
                        </select>
                    </form>}
                </div>



                </div>
                <div className="container__results">
                    {search.length >= 1 ?
                        <>
                            <div className="container__movie-cards">
                                {search.map((movie, index) => (
                                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                                        <Card
                                            title={movie.title}
                                            img={movie.poster_path !== null ?
                                                `${IMGw300_URL}${movie.poster_path}`
                                                : posterNotFound}
                                            alt={movie.poster_path !== null
                                                ? `Poster from ${movie.title}`
                                                : `Poster not available`}
                                            overview={movie.overview ? movie.overview : infoEnglish?.[index]?.overview}
                                            lang={!movie.overview ? 'en' : 'de'}
                                            rating={movie.vote_average}
                                        />
                                    </Link>
                                )
                                )}
                            </div>
                            <ButtonPages
                                page={page}
                                setPage={setPage}
                                totalPages={totalPages}
                            />
                        </>
                        :
                        <>
                            <p className="no-results">Leider ergab die Suche kein Ergebnis</p>
                            <p className="no-results">Versuche es erneut mit einem anderen Suchbegriff.</p>
                        </>

                    }

                </div>

        </section>
    )
}

export default SearchSection;
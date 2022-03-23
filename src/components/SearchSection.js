import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
import Card from './Card';
import './SectionSearch.scss';
import posterNotFound from '../assets/posterNotFound.png'
import ButtonPages from "./ButtonPages/ButtonPages";
import { API_KEY, IMGw300_URL, URL_BASE, QUERY_LANGUAGE } from "./export_files";
import backgroundTitleSection from '../assets/backgroundTitleSection.png';

const SearchSection = () => {
    const [search, setSearch] = useState([]);
    const [infoEnglish, setInfoEnglish] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(500);
    
    const [optionGenre, setOptionGenre] = useState(false);
    const [optionInput, setOptionInput] = useState(false);
  
    const [genresList, setGenresList] = useState([]);
    const [selectValue, setSelectValue] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams({
        title_contains: '',
        genre: '',
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
        setSearchParams({
            genre: e.target.value
        })
    }

    useEffect(() => {

        let optionGenre2 = false
        let optionInput2 = false

        if (searchParams.get('title_contains')) {
           optionInput2 = true;
        }
        else {
            optionGenre2 = true
        }

        let endpoint;
        let parametro;
        if (optionInput2) {
            endpoint = 'search/movie'
            parametro = `&query=${searchParams.get('title_contains')}`
        }
        if (optionGenre2) {
            endpoint = 'discover/movie'
            parametro = `&with_genres=${searchParams.get('genre')}`
        }

        fetch(`${URL_BASE}${endpoint}${API_KEY}${parametro}${QUERY_LANGUAGE}de&page=${page}`)
            .then(res => res.json())
            .then((data) => {
                setSearch(data?.results ? data.results : []);
                data?.total_pages < 500 ? setTotalPages(data.total_pages) : setTotalPages(500)
            })
        fetch(`${URL_BASE}${endpoint}${API_KEY}${parametro}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setInfoEnglish(data?.results ? data.results : []);
            })

    }, [searchParams, page, selectValue, totalPages])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list${API_KEY}${QUERY_LANGUAGE}de`)
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
                    <button onClick={handleNameSearch}>Nach Namen suchen</button>
                    {optionInput && <form className="form__search-section">
                        <input ref={inputSearch} type="text" ></input>
                        <button aria-label='nach Namen suchen' type="submit" onClick={handleClick}><VscSearch /></button>
                    </form>}
                </div>
                <p>OR</p>
                <div className="column__form-button">
                    <button onClick={handleGenreSearch}>Nach Genre suchen </button>
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
                                        overview={movie.overview ? movie.overview : infoEnglish[index]?.overview}
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
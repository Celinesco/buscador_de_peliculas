import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
import Card from './Card';
import './SectionSearch.scss';
import posterNotFound from '../assets/posterNotFound.png'
import ButtonPages from "./ButtonPages";
import { API_KEY, IMGw300_URL, URL_Search } from "./export_files";
import backgroundTitleSection from '../assets/backgroundTitleSection.png';

const SearchSection = () => {
    const [search, setSearch] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(500)
    const [infoEnglish, setInfoEnglish] = useState([])
    const [searchParams, setSearchParams] = useSearchParams({
        title_contains: "Mickey",
    });

    const inputSearch = useRef()
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
        fetch(`${URL_Search}api_key=${API_KEY}&query=${searchParams.get('title_contains')}&language=de-DE&page=${page}`)
            .then(res => res.json())
            .then((data) => {
                setSearch(data?.results ? data.results : []);
                (data?.total_pages) < 500 && setTotalPages(data?.total_pages)
            })
        fetch(`${URL_Search}api_key=${API_KEY}&query=${searchParams.get('title_contains')}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setInfoEnglish(data?.results ? data.results : []);
            })
        inputSearch.current.focus()
    }, [searchParams, page])


    return (
        <section className="section__search sections__styles">
            <div className="container__title-background-image">
                <img src={backgroundTitleSection} alt=""></img>
                <div className="container__title-section">
                    <h2>Suche</h2>
                    <form className="form__search-section">
                        <input ref={inputSearch} type="text" onChange={handleOnChange} value={inputValue}></input>
                        <button aria-label='suchen' type="submit" onClick={handleClick}><VscSearch /></button>
                    </form>
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
                                        lang={!movie.overview && "en"}
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
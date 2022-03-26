import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
import Card from './Cards/Card';
import './SectionSearch.scss';
import posterNotFound from '../assets/posterNotFound.png'
import ButtonPages from "./ButtonPages/ButtonPages";
import { API_KEY, IMGw300_URL, URL_BASE, QUERY_LANGUAGE } from "./export_files";
import backgroundTitleSection from '../assets/backgroundTitleSection.png';

const SearchSection = () => {
    const [info, setInfo] = useState([]);
    const [infoEnglish, setInfoEnglish] = useState([]);
    const [genresList, setGenresList] = useState([])

    const navigate = useNavigate()
    const urlParams = useParams()

    let initialPage = urlParams.page
    if( isNaN(initialPage) ) {
         initialPage = 1
    }
    let initialType = urlParams.type 
    if( initialType !== 'contains' || initialType !== 'genre') {
        initialType = 'contains'
    };

    
    const [page, setPage] = useState(Number(initialPage));
    const [totalPages, setTotalPages] = useState(500);

    const [inputValue, setInputValue] = useState( urlParams.value ? urlParams.value : 'adaptation')
    const inputSearch = useRef()

    const [ optionInput, setOptionInput] = useState(true)
  



    
    const handleClick = (e) => {
        setPage(1)
        setInputValue(inputSearch.current.value)
        e.preventDefault()
        navigate(`/search/contains/${inputValue}/1`)
    }
    const handleChange = (e) => {
        setPage(1)
    }

    useEffect(() => {

         fetch(`${URL_BASE}search/movie${API_KEY}&query=${urlParams.value}${QUERY_LANGUAGE}de&page=${page}`)
            .then(res => res.json())
            .then((data) => {
                setInfo(data?.results ? data.results : []);
                data?.total_pages < 500 ? setTotalPages(data.total_pages) : setTotalPages(500)
                navigate(`/search/contains/${inputValue}/${page}`)
            })
              fetch(`${URL_BASE}search/movie${API_KEY}&query=${urlParams.value}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setInfoEnglish(data?.results ? data.results : []);
            })



        // fetch(`${URL_BASE}${endpoint}${API_KEY}${parametro}${QUERY_LANGUAGE}de&page=${page}`)
        //     .then(res => res.json())
        //     .then((data) => {
        //         setSearch(data?.results ? data.results : []);
        //         data?.total_pages < 500 ? setTotalPages(data.total_pages) : setTotalPages(500)
        //     })
        // fetch(`${URL_BASE}${endpoint}${API_KEY}${parametro}&page=${page}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setInfoEnglish(data?.results ? data.results : []);
        //     })

    }, [urlParams.value, page, inputValue])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list${API_KEY}${QUERY_LANGUAGE}de`)
            .then(res => res.json())
            .then(data => {
                setGenresList(data?.genres)
            })
    }, [])



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
                    <button>Nach Namen suchen</button>
                  {optionInput && 
                  <form className="form__search-section">
                  <input ref={inputSearch} type="text" ></input>
                  <button aria-label='nach Namen suchen' type="submit" onClick={handleClick}><VscSearch /></button>
              </form>}   
                </div>
                <p>OR</p>
                <div className="column__form-button">
                    <button>Nach Genre suchen </button>
                     {!optionInput && <form className="form__search-section">
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
                {info.length >= 1 ?
                    <>
                        <div className="container__movie-cards">
                            {info.map((movie, index) => (
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
                            // setSearchParams={setSearchParams}
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
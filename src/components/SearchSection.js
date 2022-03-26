import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
import Card from './Cards/Card';
import './SectionSearch.scss';
import posterNotFound from '../assets/posterNotFound.png'
import ButtonPages from "./ButtonPages/ButtonPages";
import { API_KEY, IMGw300_URL, URL_BASE, QUERY_LANGUAGE } from "./export_files";
import backgroundTitleSection from '../assets/backgroundTitleSection.png';
import useFetchSearch from '../hooks/useFetchSearch';

const SearchSection = () => {

 //este componente va a leer una url, y le va a pasar a useFetchSearch la info necesaria para que haga el fetch.
 // la info necesaria es: numero de pagina, tipo de busqueda(genero o por nombre), y el valor de la busqueda que el usuario quiere. 
 //va a recibir a cambio: totalPages, info, page e infoEnglish

    const [genresList, setGenresList] = useState([])

    
    const navigate = useNavigate()
    const urlParams = useParams()

    let initialPage = urlParams.page
    if( isNaN(initialPage) ) {
         initialPage = 1
    }

    
    let initialType = urlParams.type 
    if( initialType !== 'genre') {
        initialType = 'contains'
    };

    const [page, setPage] = useState(Number(initialPage));
    const [searchType, setSearchType] = useState(initialType);
    const [searchValue, setSearchValue] = useState(urlParams.value ? urlParams.value : 'adaptation')

    
    const inputSearch = useRef()

    const [info, totalPages] = useFetchSearch(searchType, searchValue, 'de', page)

    let initialOption;
    if (initialType !== 'genre') {
        initialOption = true
    }

    const [ optionInput, setOptionInput] = useState(initialOption)
  


    const handleClickOption = () => {
        setOptionInput(!optionInput)
        searchType === 'contains' ? setSearchType('genre') : setSearchType('contains')
    }
    
    const handleClick = (e) => {
        setPage(1)
        setSearchValue(inputSearch.current.value)
        e.preventDefault()
    }
    const handleChange = (e) => {
        setPage(1)
        setSearchValue(e.target.value)
    }



    useEffect(() => {
        navigate(`/search/${searchType}/${searchValue}/${page}`)
        fetch(`https://api.themoviedb.org/3/genre/movie/list${API_KEY}${QUERY_LANGUAGE}de`)
            .then(res => res.json())
            .then(data => {
                setGenresList(data?.genres)
            })
    }, [page, searchType, searchValue])



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
                    <button onClick={handleClickOption}>Nach Namen suchen</button>
                  {optionInput && 
                  <form className="form__search-section">
                  <input ref={inputSearch} type="text" ></input>
                  <button aria-label='nach Namen suchen' type="submit" onClick={handleClick}><VscSearch /></button>
              </form>}   
                </div>
                <p>OR</p>
                <div className="column__form-button">
                    <button onClick={handleClickOption}>Nach Genre suchen </button>
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
                                        overview={movie.overview ? movie.overview : info[index]?.overview}
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
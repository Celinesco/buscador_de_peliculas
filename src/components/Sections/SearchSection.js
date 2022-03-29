import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
import Card from '../Cards/Card';
import './Sections.scss';
import posterNotFound from '../../assets/posterNotFound.png'
import ButtonPages from "../ButtonPages/ButtonPages";
import { API_KEY, IMGw300_URL, QUERY_LANGUAGE } from "../export_files";
import backgroundTitleSection from '../../assets/backgroundTitleSection.png';
import useFetchSearch from '../../hooks/useFetchSearch';
import Loader from "../Loader/Loader";

const SearchSection = () => {

    const navigate = useNavigate();
    const urlParams = useParams();

    const [page, setPage] = useState(isNaN(urlParams.page) ? 1 : Number(urlParams.page));
    const [searchType, setSearchType] = useState(urlParams.type !== 'genre' ? urlParams.type = 'contains' : urlParams.type);
    const [searchValue, setSearchValue] = useState(urlParams.value ? urlParams.value : 'Tom y Jerry');
    const [optionInput, setOptionInput] = useState(urlParams.type !== 'genre' ? true : false);
    const [valorSelect, setValorSelect] = useState();
    const [genreToShow, setGenreToShow] = useState({name:'Genre'})

    const inputSearch = useRef();
   
    //variables del fetch
    const [info, totalPages, loadingResults] = useFetchSearch(searchType, searchValue, 'de', page);
    const [infoEN] = useFetchSearch(searchType, searchValue, 'en', page);
    const [genresList, setGenresList] = useState([]);

    const handleClickOption = () => {
        setOptionInput(!optionInput)
        searchType === 'contains' ? setSearchType('genre') : setSearchType('contains')
    };

    const handleClick = (e) => {
        setPage(1)
        setSearchValue(inputSearch.current.value)
        e.preventDefault()
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setPage(1)
        setSearchValue(valorSelect)
        setGenreToShow(genresList.find(element=> element.id === Number(valorSelect)))
    };

    useEffect(() => {
        navigate(`/search/${searchType}/${searchValue}/${page}`)
    }, [page, searchValue]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list${API_KEY}${QUERY_LANGUAGE}de`)
            .then(res => res.json())
            .then(data => {
                setGenresList(data?.genres)
            })
    }, []);

 

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
                <p>Oder</p>
                <div className="column__form-button">
                    <button onClick={handleClickOption}>Nach Genre suchen </button>
                    {!optionInput && <form className="form__search-section" onSubmit={handleSubmit}>
                        <select name='genre' value={valorSelect} onChange={(e) => {setValorSelect(e.target.value)}}>
                            <option value="" >Wähle ein Genre</option>
                            {genresList.map(genre => (
                                <option key={genre.id} value={genre.id} name={genre.name}>{genre.name}</option>
                            ))}
                        </select>
                        <button aria-label='nach Namen suchen' type="submit"><VscSearch /></button>
                    </form>}
                </div>
            </div>
            <div className="container__results">
                {loadingResults ? <Loader />
                    : <>
                        {info.length >= 1 ?
                            <>
                                <h3 className="title__search-results">{`Ergebnisse für: ${isNaN(searchValue) ? searchValue : genreToShow?.name}`}</h3>
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
                                                overview={movie.overview ? movie.overview : infoEN[index]?.overview}
                                                lang={!movie.overview ? 'en' : 'de'}
                                                rating={movie.vote_average}
                                            />
                                        </Link>
                                    ))}
                                </div>
                                <ButtonPages
                                    page={page}
                                    setPage={setPage}
                                    totalPages={totalPages} />
                            </>
                            :
                            <>
                                <p className="no-results">Leider ergab die Suche kein Ergebnis</p>
                                <p className="no-results">Versuche es erneut mit einem anderen Suchbegriff.</p>
                            </>
                        }
                    </>
                }

            </div>
        </section>
    )
}

export default SearchSection;
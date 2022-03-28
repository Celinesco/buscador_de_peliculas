import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { URL_BASE, API_KEY, IMGw500_URL, IMGoriginal_URL, QUERY_LANGUAGE, URL_VIDEO } from "../export_files";
import './MovieDetails.scss';
import posterNotFound from '../../assets/posterNotFound.png';
import { BsFillStarFill } from "react-icons/bs";


const MovieDetails = () => {

    const selectedMovie = useParams();
    const [movieInfo, setMovieInfo] = useState({});
    const [infoEnglish, setInfoEnglish] = useState([]);
    const [video, setVideo] = useState([])
    window.scrollTo(0, 0);

    useEffect(() => {
        fetch(`${URL_BASE}movie/${selectedMovie.idMovie}${API_KEY}${QUERY_LANGUAGE}de`)
            .then(res => res.json())
            .then(data => {
                setMovieInfo(data)
            })
        fetch(`${URL_BASE}movie/${selectedMovie.idMovie}${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setInfoEnglish(data?.overview)
            })
        fetch(`${URL_BASE}movie/${selectedMovie.idMovie}/videos${API_KEY}${QUERY_LANGUAGE}de`)
            .then(res => res.json())
            .then(data => {
                setVideo(data.results)
            })
    }, [selectedMovie.idMovie])


    const filtrarTrailer = video?.find((categoria => (
        categoria.type === 'Trailer'
    )))



    const datum = new Date(movieInfo.release_date)
    const jahre = datum.getFullYear()

    return (
        <section className='section__details'>
            <div className="container__background-img" style={{ backgroundImage: `url(${IMGoriginal_URL}${movieInfo.backdrop_path})` }}>
                <div className="main__container">
             
                    <div className="container__poster">
                        {movieInfo.poster_path !== null
                            ? <img src={`${IMGw500_URL}${movieInfo.poster_path}`} alt="Filmposter"></img>
                            : <img src={posterNotFound} className="img-not-found" alt="Gibt es kein poster"></img>
                        }
                    </div>
                    <div className="container__info">
                    <div className="container__butons-info-options">
                        <button className="info-cast">Info</button>
                        <button className="info-cast">Cast</button>
                    </div>
                        <h3>{movieInfo.title}</h3>
                        <div className="container__raiting-year">
                            {!isNaN(jahre) && <p>{jahre}</p>}
                            <div className="raiting">
                                <BsFillStarFill fontSize="22px" color="#ffd505" />
                                <span>{movieInfo?.vote_average}</span><p>/ 10</p>
                            </div>
                        </div>
                        <div className="container__genres">
                            <h4>Genre</h4>
                            <div>{movieInfo?.genres?.map(genero => (
                                <Link to={`/search/genre/${genero.id}/1`} key={genero.id}><p>{genero.name}</p></Link>
                            ))}</div>
                        </div>
                        <div className="container__overview">
                            <h4>Handlung:</h4>
                            {movieInfo.overview
                                ? <p>{movieInfo.overview}</p>
                                : <p lang="en">{infoEnglish}</p>
                            }

                        </div>
                        {filtrarTrailer &&
                            <div className="container__video">
                                <iframe
                                    title={`YouTube video player. Trailer von ${movieInfo.title}`}
                                    gyroscope="true"
                                    encrypted-media='true'
                                    frameBorder='0'
                                    src={`${URL_VIDEO}${filtrarTrailer.key}`}
                                    allowFullScreen />
                            </div>}

                    </div>
                </div>
            </div>

        </section >
    )
}

export default MovieDetails;
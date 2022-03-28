import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IMGw500_URL, IMGoriginal_URL, URL_VIDEO, IMGw300_URL } from "../export_files";
import useFetchMovieDetails from "../../hooks/useFecthMovieDetails";
import './MovieDetails.scss';
import posterNotFound from '../../assets/posterNotFound.png';
import { BsFillStarFill } from "react-icons/bs";


const MovieDetails = () => {

    window.scrollTo(0, 0);

    const selectedMovie = useParams();
    const { info } = useFetchMovieDetails(selectedMovie.idMovie, 'de');
    const { info: infoEnglish } = useFetchMovieDetails(selectedMovie.idMovie, 'en')
    const { info: video } = useFetchMovieDetails(`${selectedMovie.idMovie}/videos`, 'de');
    const { info: cast } = useFetchMovieDetails(`${selectedMovie.idMovie}/credits`, 'de'); //En las pelis de animacion me tres las voces de los actores en el idioma origianl, deberia agregar algo

    const [castOrInfo, setCastOrInfo] = useState(true);

    const handleClick = () => {
        setCastOrInfo(!castOrInfo)
    }
    const filtrarTrailer = video?.results?.find((categoria => (
        categoria.type === 'Trailer'
    )))

    const datum = new Date(info.release_date)
    const jahre = datum.getFullYear()

    return (
        <section className='section__details'>
            <div className="container__background-img" style={{ backgroundImage: `url(${IMGoriginal_URL}${info.backdrop_path})` }}>
                <div className="main__container">
                    <div className="container__poster">
                        {info.poster_path !== null
                            ? <img src={`${IMGw500_URL}${info.poster_path}`} alt="Filmposter"></img>
                            : <img src={posterNotFound} className="img-not-found" alt="Gibt es kein poster"></img>
                        }
                    </div>
                    <div className="container__info">
                        <div className="container__butons-info-options">
                            <button className="info-cast" onClick={handleClick}>{!castOrInfo ? 'Info' : 'Besetzung'}</button>
                        </div>
                        <h3>{info.title}</h3>
                        {castOrInfo ?
                            <>
                                <div className="container__raiting-year">
                                    {!isNaN(jahre) && <p>{jahre}</p>}
                                    <div className="raiting">
                                        <BsFillStarFill fontSize="22px" color="#ffd505" />
                                        <span>{info?.vote_average}</span><p>/ 10</p>
                                    </div>
                                </div>
                                <div className="container__genres">
                                    <h4>Genre</h4>
                                    <div>{info?.genres?.map(genero => (
                                        <Link to={`/search/genre/${genero.id}/1`} key={genero.id}><p>{genero.name}</p></Link>
                                    ))}</div>
                                </div>
                                <div className="container__overview">
                                    <h4>Handlung:</h4>
                                    {info.overview
                                        ? <p>{info.overview}</p>
                                        : <p lang="en">{infoEnglish.overview}</p>}
                                </div>
                                {filtrarTrailer &&
                                    <div className="container__video">
                                        <iframe
                                            title={`YouTube video player. Trailer von ${info.title}`}
                                            gyroscope="true"
                                            encrypted-media='true'
                                            frameBorder='0'
                                            src={`${URL_VIDEO}${filtrarTrailer.key}`}
                                            allowFullScreen />
                                    </div>
                                }
                            </>
                            : <div className="container__cast">
                                {cast?.cast.map(actor => (
                                    <div className="container__card-actor" key={actor.cast_id}>
                                        <div className="container__img-actor">
                                            <img src={IMGw300_URL + actor.profile_path} alt={actor.name}></img>
                                        </div>
                                        <h4>{actor.name}</h4>
                                        <p>{actor.character}</p>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>

        </section>
    )
}

export default MovieDetails;
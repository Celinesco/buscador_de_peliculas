import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { URL_BASE, API_KEY, IMGw500_URL, IMGoriginal_URL } from "./export_files";
import './MovieDetails.scss';
import posterNotFound from '../assets/posterNotFound.png';
import { BsFillStarFill } from "react-icons/bs";


const MovieDetails = () => {

    const selectedMovie = useParams();
    const [movieInfo, setMovieInfo] = useState({});

    useEffect(() => {
        fetch(`${URL_BASE}${selectedMovie.idMovie}?api_key=${API_KEY}&language=de-DE`)
            .then(res => res.json())
            .then(data => {
                setMovieInfo(data)
            })
    }, [selectedMovie.idMovie])


    const datum = new Date(movieInfo.release_date)
    const jahre = datum.getFullYear()

    return (
        <section className='section__details'>
            <div className="container__background-img" style={{ backgroundImage: `url(${IMGoriginal_URL}${movieInfo.backdrop_path})` }}>
                {movieInfo.backdrop_path === null && <p> Leider gibt es kein Foto </p>}
                <div className="main-container">
                    <div className="container__poster">
                        {movieInfo.poster_path !== null
                            ? <img src={`${IMGw500_URL}${movieInfo.poster_path}`} alt="Filmposter"></img>
                            : <img src={posterNotFound} className="img-not-found" alt="Gibt es kein poster"></img>
                        }
                    </div>
                    <div className="container__info">
                        <h3>{movieInfo.title}</h3>
                        <div className="container__raiting-year">
                            {!isNaN(jahre) && <p>{jahre}</p>}
                            <div className="raiting">
                                <BsFillStarFill fontSize="22px" color="#ffd505"/>
                                <span>{movieInfo?.vote_average}</span><p>/ 10</p>
                            </div>
                        </div>
                        <div className="container__genres">
                            <h4>Genre</h4>
                            <div>{movieInfo?.genres?.map(genero => (
                                <p>{genero.name}</p>
                            ))}</div>
                        </div>
                        <div className="container__overview">
                            <h4>Handlung:</h4>
                            <p>{movieInfo.overview}</p>
                        </div>
                        <div className="container-video">
                            <video></video>
                        </div>
                    </div>
                </div>
            </div>

        </section >
    )
}

export default MovieDetails;
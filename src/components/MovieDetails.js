import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { URL_BASE, API_KEY, IMG_URL } from "./export_files";
import './MovieDetails.scss';
import posterNotFound from '../assets/posterNotFound.png';

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



    return (
        <section className='section__details'>
            <div className="container__background-img" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movieInfo.backdrop_path})` }}>
                {movieInfo.backdrop_path === null && <p> Leider gibt es kein Foto </p>}
            <div className="main-container">
                <div className="container__poster">
                    {movieInfo.poster_path !== null 
                    ? <img src={`${IMG_URL}${movieInfo.poster_path}`} alt="POSTER DE LA PELI CAMBIAR ESTO "></img>
                    : <img src={posterNotFound}  className="img-not-found" alt="poster not found"></img>
                    }
                   
                </div>
                <div className="container__info">
                    <h3>{movieInfo.title}</h3>
                    <p>Jahre</p>
                    <h4>Geschlecht</h4>
                    <h4>Handlung:</h4>
                    <p>{movieInfo.overview}</p>
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
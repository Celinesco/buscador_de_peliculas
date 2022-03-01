import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from './Card';
import posterNotFound from '../assets/posterNotFound.png'
import ButtonPages from "./ButtonPages";
import './SectionSearch.scss';
import backgroundTitleSection from '../assets/backgroundTitleSection.png'

const NewReleasesSection = () => {
    const API_KEY = '65039781e8b8e09c46c6da646de7be01';
    const URL_LASTS_RELEASES = 'https://api.themoviedb.org/3/discover/movie?';
    const IMG_URL = 'https://image.tmdb.org/t/p/w500'
    const [search, setSearch] = useState([])
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`${URL_LASTS_RELEASES}api_key=${API_KEY}&release_dates&page=${page}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSearch(data.results ? data.results : [])
                setTotalResults(data.total_results)
    
            })
    }, [page])

    return (
        <section className="sections__styles">
            <div className="container__title-section">
                <img src={backgroundTitleSection} alt=""></img>
                <h2 className="title__section">New Releases</h2>
            </div>
            <div className="container__results">
                <p className="p__results">Results: {totalResults}</p>
                <div className="container__movie-cards">
                    {search.map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id}>
                            <Card
                                title={movie.title}
                                img={movie.poster_path !== null ?
                                    `${IMG_URL}${movie.poster_path}`
                                    : posterNotFound}
                                alt={movie.poster_path !== null
                                    ? `Poster from ${movie.title}`
                                    : `Poster not available`}
                            />
                        </Link>
                    )
                    )}
                </div>
                <ButtonPages 
                 page={page}
                 totalPages={500}
                 setPage={setPage}
                />
            </div>
        </section>
    )
}




export default NewReleasesSection;
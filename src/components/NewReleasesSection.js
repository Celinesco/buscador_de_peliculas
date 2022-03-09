import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from './Card';
import posterNotFound from '../assets/posterNotFound.png'
import ButtonPages from "./ButtonPages";
import './SectionSearch.scss';
import backgroundTitleSection from '../assets/backgroundTitleSection.png';
import { API_KEY, URL_BASE, IMGw300_URL } from './export_files';


const NewReleasesSection = () => {

    const [search, setSearch] = useState([])
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`${URL_BASE}now_playing?api_key=${API_KEY}&language=de-DE&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setSearch(data.results ? data.results : [])
            })
    }, [page])

    return (
        <section className="sections__styles">
            <div className="container__title-background-image">
                <img src={backgroundTitleSection} alt=""></img>
                <div className="container__title-section">
                    <h2>Neuerscheinungen</h2>
                </div>
            </div>
            <div className="container__results">
                <div className="container__movie-cards">
                    {search.map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id}>
                            <Card
                                id={movie.id}
                                title={movie.title}
                                img={movie.poster_path !== null ?
                                    `${IMGw300_URL}${movie.poster_path}`
                                    : posterNotFound}
                                alt={movie.poster_path !== null
                                    ? `Poster from ${movie.title}`
                                    : `Poster not available`}
                                overview={movie.overview}
                                rating={movie.vote_average}
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
import { Link } from "react-router-dom";
import Card from './Card';
import posterNotFound from '../assets/posterNotFound.png'
import ButtonPages from "./ButtonPages/ButtonPages";
import './SectionSearch.scss';
import backgroundTitleSection from '../assets/backgroundTitleSection.png';
import {  IMGw300_URL } from './export_files';
import useFetchDefaultLists from "../hooks/useFetchDefaultLists";


const MostPopularSection = () => {

    const [popularDE, loadingSign, , page, setPage] = useFetchDefaultLists('popular', 'de');
    const [popularUS] = useFetchDefaultLists('popular','');

    return (
        <section className="section__mostpopular sections__styles">
            <div className="container__title-background-image">
                <img src={backgroundTitleSection} alt=""></img>
                <div className="container__title-section">
                    <h2>Populär</h2>
                </div>
            </div>
            <div className="container__results">
                <div className="container__movie-cards">
                    {popularDE.map((movie, index) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id}>
                            <Card
                                title={movie.title}
                                img={movie.poster_path !== null ?
                                    `${IMGw300_URL}${movie.poster_path}`
                                    : posterNotFound}
                                alt={movie.poster_path !== null
                                    ? `Poster from ${movie.title}`
                                    : `Poster not available`}
                                rating={movie.vote_average}
                                overview={movie.overview ? movie.overview : popularUS[index]?.overview}
                                lang={!movie.overview ? 'en' : 'de'}
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

export default MostPopularSection;

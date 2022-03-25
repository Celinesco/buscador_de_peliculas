import { Link } from "react-router-dom";
import Card from './Cards/Card';
import posterNotFound from '../assets/posterNotFound.png'
import ButtonPages from "./ButtonPages/ButtonPages";
import './SectionSearch.scss';
import backgroundTitleSection from '../assets/backgroundTitleSection.png';
import { IMGw300_URL } from './export_files';
import useFetchDefaultLists from "../hooks/useFetchDefaultLists";
import Loader from "./Loader/Loader";
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';



const MostPopularSection = () => {
    const [pageNumber, setPageNumber] = useSearchParams({
        current_page: 1,
      });
    const [page, setPage] = useState(Number(pageNumber.get("current_page")));
    const [popularDE, loadingPopular] = useFetchDefaultLists('popular', 'de', page);
    const [popularUS] = useFetchDefaultLists('popular', '', page);

    return (

        <section className="section__mostpopular sections__styles">
            <div className="container__title-background-image">
                <img src={backgroundTitleSection} alt=""></img>
                <div className="container__title-section">
                    <h2>Populär</h2>
                </div>
            </div>
            <div className="container__results">
                {loadingPopular
                    ? <Loader />
                    : <>
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
                            setPageNumber={setPageNumber}
                            page={page}
                            totalPages={500}
                            setPage={setPage}
                        />
                    </>}
            </div>
        </section>
    )

}

export default MostPopularSection;

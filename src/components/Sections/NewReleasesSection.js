
import useFetchDefaultLists from '../../hooks/useFetchDefaultLists';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Card from '../Cards/Card';
import posterNotFound from '../../assets/posterNotFound.png'
import ButtonPages from "../ButtonPages/ButtonPages";
import './Sections.scss';
import backgroundTitleSection from '../../assets/backgroundTitleSection.png';
import { IMGw300_URL } from '../export_files';
import Loader from '../Loader/Loader';
import { useState, useEffect } from 'react';


const NewReleasesSection = () => {

    const navigate = useNavigate()
    const urlParams = useParams()
  
    const [page, setPage] = useState(isNaN(urlParams.page) ? 1 : Number(urlParams.page));
    const [newReleasesDE, loadingNewReleases, totalPages] = useFetchDefaultLists('now_playing', 'de',`&page=${page}`);
    const [newReleasesUS] = useFetchDefaultLists('now_playing', '', page);

    useEffect(()=> {
        navigate(`/now_playing/${page}`)
    }, [urlParams.page, page])

    return (
        <section className="sections__styles">
            <div className="container__title-background-image">
                <img src={backgroundTitleSection} alt=""></img>
                <div className="container__title-section">
                    <h2>Neuerscheinungen</h2>
                </div>
            </div>
            <div className="container__results">

                {loadingNewReleases
                    ? <Loader />
                    : <>
                        <div className="container__movie-cards">
                            {newReleasesDE.map((movie, index) => (
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
                                        overview={movie.overview ? movie.overview : newReleasesUS[index]?.overview}
                                        lang={!movie.overview ? 'en' : 'de'}
                                        rating={movie.vote_average}
                                    />
                                </Link>
                            )
                            )}
                        </div>
                        <ButtonPages
                            page={page}
                            totalPages={totalPages}
                            setPage={setPage}
                        />
                    </>}

            </div>
        </section>
    )
}




export default NewReleasesSection;
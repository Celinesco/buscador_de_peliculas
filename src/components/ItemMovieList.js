import { Link } from 'react-router-dom';
import { FaChevronCircleRight } from "react-icons/fa";
import './ItemMovieList.scss';


const ItemMovieList = ({ img, idMovie, title }) => {
    return (
        <Link to={`/movie/${idMovie}`} className="container__item">
            <div className='container__img-title'>
                <div className='img-container'>
                    <img src={img} alt="Filmposter"></img>
                </div>
                <p>{title}</p>
            </div>
            <FaChevronCircleRight />
        </Link>
    )
}

export default ItemMovieList;
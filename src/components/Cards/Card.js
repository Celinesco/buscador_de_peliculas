import './Card.scss'
import { BsFillStarFill } from "react-icons/bs";
import DecorativeSquares from '../DecorativeSquares/DecorativeSquares';

const Card = ({ img, title, overview, rating, lang }) => {
    
    let arrayDecorativeSquares = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];


    return (

        <article className="card__container">
            <div className='container__img-overwiev'>
                <div className="face upper-face">
                    <div className='container__raiting'>
                        <BsFillStarFill fontSize="18px" color="#ffd505" />
                        <span>{rating}</span>
                    </div>
                    <img src={img} alt={`Posterfilm ${title}`}></img>
                </div>
                <div className='face bottom-face'>
                    <div className="square__container square__container-right">
                        {arrayDecorativeSquares.map((current, index)=> (
                            <DecorativeSquares  key={index}/>
                        ))}
                    </div>
                    <div className="square__container square__container-left">
                    {arrayDecorativeSquares.map((current, index)=> (
                            <DecorativeSquares  key={index + 1}/>
                        ))}
                    </div>
                    <h4>Handlung</h4>
                    <p className="sinopsis" lang={lang}>{overview}</p>
                </div>
            </div>
            <div className="container-movie-title">
                <h3 className='title__card'>{title}</h3>
            </div>
        </article>


    )
}

export default Card;
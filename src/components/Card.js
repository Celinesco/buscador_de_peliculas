import './Card.scss'

const Card = ({img, title}) => {
    return (
        <article className="card__poster">
            <div className="container__img">
                <img src={img} alt={`Poster from:${title}`}></img>
            </div>
            <h3 className='title__card'>{title}</h3>
        </article>
    )
}

export default Card;
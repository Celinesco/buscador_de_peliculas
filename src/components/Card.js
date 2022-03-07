import './Card.scss'

const Card = ({ img, title, overview }) => {
    return (

        <article className="card__container">
        <div className='container__img-overwiev'>
            <div className="face upper-face">
                <img src={img} alt={`Posterfilm ${title}`}></img>
            </div>
            <div className='face bottom-face'>
                <div className="square__container square__container-right">
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                </div>
                <div className="square__container square__container-left">
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                </div>
                <h4>Überblick</h4>
                <p className="sinopsis">{overview}</p>
            </div>
        </div>
        <div className="container-movie-title">
            <h3 className='title__card'>{title}</h3>
        </div>
    </article>


    )
}

export default Card;
import pag404 from '../assets/pag404.jpg';
import './Error404.scss';

const Error404 = () => {
    return (
        <section className='section__styles'>
            <div className='container__img-404'>
                <img src={pag404} alt="leeres Kino"></img>
            </div>
        </section>
    )
}

export default Error404;
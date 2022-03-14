
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, A11y, Thumbs, FreeMode, EffectFade } from 'swiper';
import { IMGoriginal_URL, IMGw300_URL } from '../../components/export_files';
import { useState } from 'react';

// Import Swiper styles
import './Carrousel.scss';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/a11y';
import 'swiper/scss/thumbs';
import "swiper/scss/free-mode";
import "swiper/scss/effect-fade";



const Carrousel = ({ info }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
 

    return (
        <>
            <Swiper
                modules={[Navigation, A11y, Thumbs, FreeMode, Autoplay, EffectFade]}
                thumbs={{ swiper: thumbsSwiper }}
                spaceBetween={10}
                effect={'fade'}
                speed={1000}
                navigation
                loop={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className="mySwiper2"
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
            >
                {info?.map((movie) =>
                    <SwiperSlide className='big-view-slides' key={movie.id} style={{ backgroundImage: `url(${IMGoriginal_URL}${movie.backdrop_path})` }}>
                        <div className='overview-slides'>
                            <h3>{movie.title}</h3>
                            <p>{movie.overview}</p>
                        </div>
                        <div className='title-slides'>
                            <p>{movie.title}</p>
                        </div>
                    </SwiperSlide>)}

            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={7}
                freeMode={true}
                speed={900}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {info?.map((movie) =>

                    <SwiperSlide className="small-view-slides" key={movie.id}>
                        <div className='container__horizontal-square'>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                        </div>
                        <img src={`${IMGw300_URL}${movie.backdrop_path}`} alt={`Filmposter von ${movie.title}`}></img>
                        <div className='container__horizontal-square-bottom'>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                            <div className='horizontal-square'></div>
                        </div>
                    </SwiperSlide>)}
            </Swiper>

        </>

    );
};

export default Carrousel;
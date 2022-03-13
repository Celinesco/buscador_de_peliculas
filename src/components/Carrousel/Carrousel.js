
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { IMGoriginal_URL } from '../../components/export_files';

// Import Swiper styles
import './Carrousel.scss';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/css/a11y';
import 'swiper/css/scrollbar';



const Carrousel = ({ info }) => {

    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            scrollbar={{ draggable: true }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {info?.map((movie) =>
                <SwiperSlide key={movie.id}>
                    <div className='container__img-slides'>
                        <img src={`${IMGoriginal_URL}${movie.backdrop_path}`}></img>
                    </div>


                </SwiperSlide>)}

        </Swiper>
    );
};

export default Carrousel;
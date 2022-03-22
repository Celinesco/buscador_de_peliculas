import useFetch  from '../../hooks/useFetch'
import Carrousel from "./Carrousel.js";


const CarrouselContainer = () => {

    const [carrouselInfo] = useFetch('now_playing', 'de');
    const [infoEnglish] = useFetch('now_playing', '');

  
    return (
        <div className="container__carrousel">
        <Carrousel info={carrouselInfo}
        infoEnglish={infoEnglish}/>
        </div>
    )
}

export default CarrouselContainer;
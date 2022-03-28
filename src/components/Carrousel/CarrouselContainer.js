import useFetchDefaultLists from '../../hooks/useFetchDefaultLists'
import Carrousel from "./Carrousel.js";


const CarrouselContainer = () => {

    const [carrouselInfo] = useFetchDefaultLists('now_playing', 'de');
    const [infoEnglish] = useFetchDefaultLists('now_playing', '');


    return (
        <div className="container__carrousel">
            <Carrousel info={carrouselInfo}
                infoEnglish={infoEnglish} />
        </div>
    )
}

export default CarrouselContainer;
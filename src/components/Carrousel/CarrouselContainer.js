import { useDebugValue, useEffect, useState } from 'react';
import { URL_BASE, API_KEY, IMGw300_URL } from '../../components/export_files';
import Carrousel from "./Carrousel.js";


const CarrouselContainer = () => {

    const [carrouselInfo, setCarrouselInfo] = useState([])

    useEffect(() => {
        fetch(`${URL_BASE}now_playing?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => (
                setCarrouselInfo(data.results)
            ))
    },[])

    return (
        <div className="container__carrousel">
        <Carrousel info={carrouselInfo}/>
        </div>
    )
}

export default CarrouselContainer;
import {  useEffect, useState } from 'react';
import { URL_BASE, API_KEY } from '../../components/export_files';
import Carrousel from "./Carrousel.js";


const CarrouselContainer = () => {

    const [carrouselInfo, setCarrouselInfo] = useState([]);
    const [infoEnglish, setInfoEnglish] = useState([]);

    useEffect(() => {
        fetch(`${URL_BASE}now_playing?api_key=${API_KEY}&language=de-DE`)
            .then(res => res.json())
            .then(data => (
                setCarrouselInfo(data.results)
            ))
        fetch(`${URL_BASE}now_playing?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => (
            setInfoEnglish(data.results)
        ))
    },[])

    return (
        <div className="container__carrousel">
        <Carrousel info={carrouselInfo}
        infoEnglish={infoEnglish}/>
        </div>
    )
}

export default CarrouselContainer;
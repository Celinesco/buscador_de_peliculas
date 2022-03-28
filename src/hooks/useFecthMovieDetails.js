import { useState, useEffect } from "react";
import { QUERY_LANGUAGE, URL_BASE, API_KEY } from "../components/export_files";

const useFetchMovieDetails = (endpoint, lang) => {
    const [info, setInfo] = useState({});

    useEffect(() => {
        fetch(`${URL_BASE}movie/${endpoint}${API_KEY}${QUERY_LANGUAGE}${lang}`)
            .then(res => res.json())
            .then(data => {
                setInfo(data)
            })
    }, [endpoint])

    return ({ info: info })
}

export default useFetchMovieDetails;
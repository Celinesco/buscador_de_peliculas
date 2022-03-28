import { useState, useEffect } from "react";
import { QUERY_LANGUAGE, URL_BASE, API_KEY } from "../components/export_files";



const useFetchDefaultLists = (endpoint, language, page) => {

    const [info, setInfo] = useState([]);
    const [isLoading, setIsLoading] = useState([false]);
    const [totalPages, setTotalPages] = useState(500);

    useEffect(() => {
        setIsLoading(true)

        fetch(`${URL_BASE}movie/${endpoint}${API_KEY}${QUERY_LANGUAGE}${language}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setInfo(data.results ? data.results : [])
                data?.total_pages < 500 && setTotalPages(data?.total_pages)
                setIsLoading(false)
            })
    }, [page, language])

    return ([info, isLoading, totalPages])
}

export default useFetchDefaultLists;
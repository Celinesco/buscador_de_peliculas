import { useState,useEffect } from "react";
import { useSearchParams } from 'react-router-dom'
import { QUERY_LANGUAGE, URL_BASE, API_KEY } from "../components/export_files";




const useFetch = (endpoint, language) => {
    
    const [info, setInfo] = useState([]);
    const [isLoading, setIsLoading] = useState([false]);
    const [totalPages, setTotalPages] = useState(500);
    const [pageNumber, setPageNumber] = useSearchParams({
        current_page: 1,
    })
    const [page, setPage] = useState(Number(pageNumber.get('current_page')));


    useEffect(() => {
        setIsLoading(true)

        fetch(`${URL_BASE}movie/${endpoint}${API_KEY}${QUERY_LANGUAGE}${language}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setInfo(data.results ? data.results : [])
                data?.total_pages < 500 && setTotalPages(data?.total_pages)
                setIsLoading(false) 
                setPageNumber({
                    current_page: page
                })
            })

    }, [page])


    return ([info, isLoading, totalPages, page, setPage])
}

export default useFetch;
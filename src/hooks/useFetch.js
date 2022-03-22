import { useState,useEffect } from "react";




const useFetch = ({}) => {
    const [info, setInfo] = useState([])
    useEffect(() => {
        fetch(`${URL_BASE}movie/now_playing?api_key=${API_KEY}&language=de&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setSearch(data.results ? data.results : [])
                data?.total_pages < 500 && setTotalPages(data?.total_pages)
                setPageNumber({
                    current_page: page
                })
            })
        fetch(`${URL_BASE}movie/now_playing?api_key=${API_KEY}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setInfoEnglish(data.results ? data.results : [])
            })

    }, [page])
    return 
}

export default useFetch
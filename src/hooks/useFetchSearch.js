import { useState, useEffect } from "react";
import { useSearchParams, useParams } from 'react-router-dom'
import { QUERY_LANGUAGE, URL_BASE, API_KEY } from "../components/export_files";

const useFectchSearch = (option, lang ) => {
    const selectedGenre = useParams();
    const [info, setInfo] = useState([]);
    const [totalPages, setTotalPages] = useState(500);
    const [searchParams, setSearchParams] = useSearchParams({
        title_contains: 'Mickey',
        genre: 80,
        current_page: 1,
    })
    const [page, setPage] = useState(Number(searchParams.get('current_page')));

    let parametro;

    if ( option === 'search') {
        parametro = `&query=${searchParams.get('title_contains')}`
    }
    if ( option === 'discover') {
        parametro = `&with_genres=${searchParams.get('genre')}`
    }



    useEffect(() => {

        fetch(`${URL_BASE}${option}/movie${API_KEY}${parametro}${QUERY_LANGUAGE}${lang}&page=${page}`)
            .then(res => res.json())
            .then((data) => {
                setInfo(data?.results ? data.results : []);
                data?.total_pages < 500 ? setTotalPages(data.total_pages) : setTotalPages(500)
            })


    }, [searchParams.title_contains, page, totalPages, searchParams.genre])

    return ([info, totalPages, page, setPage])

}

export default useFectchSearch;
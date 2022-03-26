import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { QUERY_LANGUAGE, URL_BASE, API_KEY, QUERY_LANGUAGE } from "../components/export_files";

const useFectchSearch = (inputValue, genre, urlParams) => {

    //este componente va a leer una url, recibe tambien como prop el input del usuario y el select. Y :
    //siempre va a devolver info, totalPages y Page
    //la info la va a construir depende si:
    // Existe una URL o no. Si no, recibe por default la palabra adaptation
    //Si esa URL es de genero o de busqueda por nombre


 
    const selectedGenre = useParams();
    const [info, setInfo] = useState([]);

    const [totalPages, setTotalPages] = useState(500);
    const [page, setPage] = useState(1);

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


    }, [page, inputValue, genre])

    return ([info, totalPages, page, setPage])

}

export default useFectchSearch;
import { useState, useEffect } from "react";
import { QUERY_LANGUAGE, URL_BASE, API_KEY } from "../components/export_files";

const useFetchSearch =  (searchType, searchValue, lang, page) => {


    let option;
    let parametro;

   if (searchType === 'contains') {
       option = 'search';
       parametro = `&query=${searchValue}`;
   };
   if (searchType === 'genre') {
       option = 'discover';
       parametro = `&with_genres=${searchValue}`;
   };

 
   
    const [info, setInfo] = useState([]);

    const [totalPages, setTotalPages] = useState(500);


    useEffect(() => {

        fetch(`${URL_BASE}${option}/movie${API_KEY}${parametro}${QUERY_LANGUAGE}${lang}&page=${page}`)
            .then(res => res.json())
            .then((data) => {
                setInfo(data?.results ? data.results : []);
                data?.total_pages < 500 ? setTotalPages(data.total_pages) : setTotalPages(500)
            })

    }, [page, searchValue])

    return ([info, totalPages])

}

export default useFetchSearch;
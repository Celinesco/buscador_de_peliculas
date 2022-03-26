import { useState, useEffect } from "react";
import { QUERY_LANGUAGE, URL_BASE, API_KEY } from "../components/export_files";

const useFetchSearch =  (searchType, searchValue, lang, page) => {

    // recibe  como prop el input del usuario y el select. Y :
    //siempre va a devolver info, totalPages , el inputValue, el genero elegido y Page.
    //la info la va a construir depende si:
    // Existe una URL o no. Si no, recibe por default la palabra adaptation
    //Si esa URL es de genero o de busqueda por nombre


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


    }, [page, searchType, searchValue])

    return ([info, totalPages])

}

export default useFetchSearch;
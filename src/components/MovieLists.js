import './MovieLists.scss';
import { useEffect, useState } from 'react';
import { URL_BASE, API_KEY, IMGw300_URL } from './export_files';
import ItemMovieList from './ItemMovieList';


const MovieLists = ({endpoint, listTitle}) => {

    const [list, setList] = useState([]);

    useEffect (()=> {
        fetch(`${URL_BASE}${endpoint}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data =>(
            setList(data.results)
        ))
    }, [])

    return (
        <div className="container__movie-list">
            <h3>{listTitle}</h3>
            {list.map(movie => (
                <ItemMovieList key={movie.id}
                img={`${IMGw300_URL}${movie.poster_path}`}
                title={movie.title}
                idMovie={movie.id}/>
            ))}
        </div>
    )
}

export default MovieLists;
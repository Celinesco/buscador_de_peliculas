import './MovieLists.scss';
import useFetch  from '../hooks/useFetch';
import { IMGw300_URL } from './export_files';
import ItemMovieList from './ItemMovieList';


const MovieLists = ({ endpoint, listTitle }) => {

   const [list, loadingSign] = useFetch(endpoint,'de');

    return (
        <div className="container__movie-list">
            <div className='container__title-list'>
                <div className='container__horizontal-square'>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                </div>
                <div className='container__horizontal-square-bottom'>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                    <div className='horizontal-square'></div>
                </div>
                <h3>{listTitle}</h3>
            </div>
            {list.map(movie => (
                <ItemMovieList key={movie.id}
                    img={`${IMGw300_URL}${movie.poster_path}`}
                    title={movie.title}
                    idMovie={movie.id} />
            ))}
        </div>
    )
}

export default MovieLists;
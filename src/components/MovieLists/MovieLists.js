import './MovieLists.scss';
import useFetchDefaultLists  from '../../hooks/useFetchDefaultLists';
import { IMGw300_URL } from '../export_files';
import ItemMovieList from '../ItemMovieList/ItemMovieList';


const MovieLists = ({ endpoint, listTitle }) => {

   const [list, loadingSign] = useFetchDefaultLists(endpoint,'de');

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
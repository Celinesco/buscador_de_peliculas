import './MovieLists.scss';
import useFetchDefaultLists from '../../hooks/useFetchDefaultLists';
import { IMGw300_URL } from '../export_files';
import ItemMovieList from '../ItemMovieList/ItemMovieList';
import DecorativeSquares from '../DecorativeSquares/DecorativeSquares';


const MovieLists = ({ endpoint, listTitle }) => {

    const [list] = useFetchDefaultLists(endpoint, 'de');
    let arrayDecorativeSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

    return (
        <div className="container__movie-list">
            <div className='container__title-list'>
                <div className='container__horizontal-square'>
                    {arrayDecorativeSquares.map((current, index) => (
                        <DecorativeSquares
                            key={index}
                            squareOrientation='horizontal' />
                    ))}
                </div>
                <div className='container__horizontal-square-bottom'>
                    {arrayDecorativeSquares.map((current, index) => (
                        <DecorativeSquares
                            key={index + 2}
                            squareOrientation='horizontal' />
                    ))}
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
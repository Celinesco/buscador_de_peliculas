import './NavBar.scss';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import popCorn from '../../assets/popCorn.png';

const NavBar = () => {
    return (
        <nav className='navbar'>
            <div className='container__img-icon'>
                <img src={popCorn} alt="popcorn, cotufas, palomitas de maiz, pororo, pururu"></img>
            </div>
            <ul className='ul__navbar'>
                <Link to="/"><li>Start</li></Link>
                <Link to="/newreleases"><li>Neuer- scheinungen</li></Link>
                <Link to="/mostpopular"><li>Populäres</li></Link>
                <Link to="/search/"><li>Suchen</li></Link>
                <Link to="/movie/:idMovie"></Link>
            </ul>
        </nav>
    )
}

export default NavBar;

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
                <li>Home</li>
                <li>Últimos lanzamientos</li>
                <li>Populares</li>
                <li>Buscar</li>
            </ul>
        </nav>
    )
}

export default NavBar;

// <a href='https://www.freepik.es/vectores/fondo'>Vector de Fondo creado por rawpixel.com - www.freepik.es</a>
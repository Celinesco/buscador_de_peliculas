import './NavBar.scss';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import popCorn from '../../assets/popCorn.png';
import { useState } from 'react';
import NavBarMenu from './NavBarMenu';

const NavBar = () => {
    const [menuHamburguesa, setMenuHamburguesa] = useState(false)

    const handleClick = () => {
        setMenuHamburguesa(true)
    }

    return (
        <nav className='navbar'>
            <div className='container__img-icon'>
                <img src={popCorn} alt="popcorn"></img>
            </div>
            <ul className='ul__navbar'>
                <Link to="/"><li>START</li></Link>
                <Link to="/now_playing/:page"><li>NEU!</li></Link>
                <Link to="/popular/:page"><li>POPULÄR</li></Link>
                <Link to="/search/"><li>SUCHE</li></Link>
                <Link to="/movie/:idMovie"></Link>
            </ul>
            <button aria-label='Menü öffnen' onClick={handleClick} className='clappboard' >
                <div className="punto"></div>
                <div className={menuHamburguesa ? 'upper-part-box clap-clap' : 'upper-part-box'}></div>
                <div className="square-clappboard">
                    <div className="sub-square"></div>
                    <p className="content-logo-hamburger-menu">Aktion!</p>
                </div>
            </button>
            <NavBarMenu
                menuHamburguesa={menuHamburguesa}
                setMenuHamburguesa={setMenuHamburguesa} />
        </nav>
    )
}

export default NavBar;

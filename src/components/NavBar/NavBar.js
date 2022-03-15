import './NavBar.scss';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import popCorn from '../../assets/popCorn.png';
import { useState } from 'react';

const NavBar = () => {
    const [menuHamburguesa, setMenuHamburguesa] = useState(false)

    const handleClick = () => {
        setMenuHamburguesa(true)
    }

    const handleClickCerrar = () => {
        setMenuHamburguesa(false)
    }

    return (
        <nav className='navbar'>
            <div className='container__img-icon'>
                <img src={popCorn} alt="popcorn, cotufas, palomitas de maiz, pororo, pururu"></img>
            </div>
            <ul className='ul__navbar'>
                <Link to="/"><li>START</li></Link>
                <Link to="/newreleases"><li>NEU!</li></Link>
                <Link to="/mostpopular"><li>POPULÄR</li></Link>
                <Link to="/search/"><li>SUCHE</li></Link>
                <Link to="/movie/:idMovie"></Link>
            </ul>
            <button onClick={handleClick} className='clappboard' >
                <div className="punto"></div>
                <div className={"upper-part-box " + `${menuHamburguesa && 'clap-clap'}`}></div>
                <div className="square-clappboard">
                    <div className="sub-square"></div>
                    <p className="text-action-button">Aktion!</p>
                </div>
            </button>
           
                <div className={'container__navmenu ' + `${menuHamburguesa && 'dropdown'}`}>
                    <button onClick={handleClickCerrar}>X</button>
                    <ul className='ul__navbar-menu'>
                        <Link onClick={handleClickCerrar} to="/"><li>START</li></Link>
                        <Link onClick={handleClickCerrar} to="/newreleases"><li>NEU!</li></Link>
                        <Link onClick={handleClickCerrar} to="/mostpopular"><li>POPULÄR</li></Link>
                        <Link onClick={handleClickCerrar} to="/search/"><li>SUCHE</li></Link>
                        <Link onClick={handleClickCerrar} to="/movie/:idMovie"></Link>
                    </ul>
                </div>
            
        </nav>
    )
}

export default NavBar;

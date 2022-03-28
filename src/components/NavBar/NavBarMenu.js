import './NavBar.scss';
import { Link } from 'react-router-dom';

const NavBarMenu = ({ menuHamburguesa, setMenuHamburguesa }) => {

    const handleClickCerrar = () => {
        setMenuHamburguesa(false)
    }

    return (
        <>
            <div className={menuHamburguesa ? 'container__navmenu dropdown' : 'container__navmenu'}>
                <button aria-label='Menü schließen' onClick={handleClickCerrar}>X</button>
                <ul className='ul__navbar-menu'>
                    <Link onClick={handleClickCerrar} to="/"><li>START</li></Link>
                    <Link onClick={handleClickCerrar} to="/now_playing/:page"><li>NEU!</li></Link>
                    <Link onClick={handleClickCerrar} to="/popular/:page"><li>POPULÄR</li></Link>
                    <Link onClick={handleClickCerrar} to="/search/"><li>SUCHE</li></Link>
                    <Link onClick={handleClickCerrar} to="/movie/:idMovie"></Link>
                </ul>
            </div>
        </>

    )
}

export default NavBarMenu;
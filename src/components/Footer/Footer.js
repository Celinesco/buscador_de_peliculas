import './Footer.scss';
import { VscGithub, VscMail } from "react-icons/vsc";
import { AiOutlineLinkedin } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className='footer'>
            <p>Hecho por Celinesco</p>
            <ul className='ul__footer'>
                <li><a href="https://www.linkedin.com/in/celinesalsina/" target="_blank" rel='noreferrer noopener'
                    className="icons-footer" aria-label="Perfil Linkedin de Celina"><AiOutlineLinkedin /></a></li>
                <li><a href="https://github.com/Celinesco" target="_blank" rel='noreferrer noopener' className="icons-footer"
                    aria-label="Enviar mail">< VscGithub /></a></li>
                     <li><a href="mailto:celina.alsina@gmail.com" target="_blank" rel='noreferrer noopener' className="icons-footer"
                    aria-label="Enviar mail a Celinesco">< VscMail /></a></li>
            </ul>
        </footer>
    )
}

export default Footer;
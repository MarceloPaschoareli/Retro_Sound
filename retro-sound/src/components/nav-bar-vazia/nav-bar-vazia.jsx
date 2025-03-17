import './nav-bar-css.css';
import logo from "../../assets/logo-retro-sound.svg";


function NavBarVazia({ }) {
    return (
        <div className="navegar-background" >
            <div className="imagem">
                <img src={logo} alt="Logo Retro Sound" />
                <p>Retro Sound</p>
            </div>
        </div>
    );
}

export { NavBarVazia };

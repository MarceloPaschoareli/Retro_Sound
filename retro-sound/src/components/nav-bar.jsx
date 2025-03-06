import React, { useState, useEffect } from "react";
import './nav-bar-css.css';
import logo from "../assets/logo-retro-sound.svg";
import login from "../assets/login.svg";
import carrinho from "../assets/carrinho.svg";
import search from '../assets/search.svg';
import { useNavigate } from "react-router-dom";

function NavBar({ setFiltro }) {

    const navigate = useNavigate()

    const HandlerClick = () => {
        navigate("/")
    }

    const CarrinhoIr = () =>{
        navigate("/carrinho")
    }

    const [bolinha, setBolinha] = useState("");

    useEffect(() => {  
        setBolinha(1);
    }, []); 

    return (
        <div className="navegar-background">
            <div className="imagem" onClick={HandlerClick}>
                <img src={logo} alt="Logo Retro Sound" />
                <p>Retro Sound</p>
            </div>
            <div className="pesquisa">
                <img src={search} alt="Ícone de pesquisa" className="search-icon" />
                <input type="text" placeholder="FAÇA SUA PESQUISA" onChange={(e) => setFiltro(e.target.value)} />
            </div>
            <div className="opcoes">
                <div className="iconeC">
                <img src={carrinho} alt="Carrinho" onClick={CarrinhoIr} />
                <div id="bolinha"><p>{bolinha}</p></div>
                </div>
                <img src={login} alt="Login" />
            </div>
        </div>
    );
}

export { NavBar };

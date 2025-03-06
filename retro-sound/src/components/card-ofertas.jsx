import React, { useState } from "react";
import './card-css.css';
import adicionar from '../assets/adicionar.svg'; // Corrigido para "adicionar"
import { useNavigate } from "react-router-dom";
import { AdicionadoPopUp } from "./pop-up-adicionado";

function CardOferta({ categoria, imagem, preco, nome }) {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const [carrinho, setCarrinho] = useState(false); // Alterado para booleano

    const navigate = useNavigate();

    const HandlerClick = () => {
        navigate('/produto/' + nome + '/25');
    }

    const Click = async () => {
        setCarrinho(true);
        await sleep(2000);
        setCarrinho(false);
    }

    return (
        <div className="card-fundo">
            <div onClick={HandlerClick}>
                <div id="vest">
                    <p>{categoria}</p>
                </div>
                <div id="item">
                    <img src={imagem} alt={nome} />
                    <p>{nome}</p>
                </div>
                <div id="dinheiro">
                    <span style={{ textDecoration: "line-through" }}>R$ 160,00</span>
                    <p>R$ {preco}</p>
                </div>
            </div>
            <div id="carrinho" onClick={Click}>
                <img src={adicionar}/>
                <p>ADICIONAR AO CARRINHO</p>
            </div>
            <AdicionadoPopUp open={carrinho} />
        </div>
    );
}

export { CardOferta };

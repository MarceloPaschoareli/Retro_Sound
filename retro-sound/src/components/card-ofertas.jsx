import React, { useState } from "react";
import './card-css.css';
import adicionar from '../assets/adicionar.svg'; // Corrigido para "adicionar"
import { useNavigate } from "react-router-dom";
import { AdicionadoPopUp } from "./pop-up-adicionado";

function CardOferta({ categoria, imagem, preco, nome, id }) {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const [carrinho, setCarrinho] = useState(false); // Alterado para booleano

    const navigate = useNavigate();

    const HandlerClick = () => {
        navigate('/produto/' + nome + '/' + id);
    }

    const Click = async () => {
        setCarrinho(true);
        await sleep(2000);
        setCarrinho(false);
    }

    return (
        <div className="card-fundo">
            <div onClick={HandlerClick} id="clicavel">
                <div id="vest">
                    <p>{categoria}</p>
                </div>
                <div id="item">
                    <div className="imagemP">
                        <img src={imagem}  />
                    </div>
                    <p>{nome}</p>
                </div>
                <div id="dinheiro">
                    <span style={{ textDecoration: "line-through" }}>R$ {(preco*1.10).toFixed(2)}</span>
                    <p>R$ {(preco).toFixed(2)}</p>
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

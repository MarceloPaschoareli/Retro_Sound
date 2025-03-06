import React from "react";
import './outros.css'
import { useNavigate } from "react-router-dom";

interface tipos{
    nome:string;
    preco:number;
    imagem:string;
    id:number;
}

function OutrosCard({ nome, preco, imagem, id }:tipos){

    const navigate = useNavigate();

    const HandlerClick = () => {
        navigate ("/produto/"+nome+"/"+id)
    }

    return (
        <div className="conteudo" onClick={HandlerClick}>
                <img src={imagem}/>
                <p>R$ {preco}</p>
        </div>
    )
}

export {OutrosCard}
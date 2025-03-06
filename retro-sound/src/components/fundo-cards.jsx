import React, { useState } from "react";
import './fundo-card-css.css';
import oferta from '../assets/oferta.svg';
import camisa from '../assets/camiseta.png';
import { CardOferta } from "./card-ofertas";

const itens = [
    {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camiseta The Bleatles"},
    {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"},
    {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"},
    {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"},
    {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"},
    {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"},
    {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"},
    {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"}
];

function FundoCard({ filtro, titulo, i, itens}) {
    const [filtroCat, setFiltroCat] = useState("");
    const [minValor, setMin] = useState("");
    const [maxValor, setMax] = useState("");

    const HandlerClick = (value) => {
        setFiltroCat(value);
    };

    const filtroPreco = (preco) => {
        const minParse = parseFloat(minValor) || 0;  
        const maxParse = parseFloat(maxValor) || Infinity;  
        const precoNum = parseFloat(preco.replace(",", ".")); 
        return precoNum >= minParse && precoNum <= maxParse;
    };

    return (
        <div className="card">
            <div className="head">
                <img src={i} alt="Ícone de oferta" />
                <h4>{titulo}</h4>
            </div>
            <div className="orga">
                <div className="filtros">
                    <form className="my-form">
                        <div>
                            <input
                                id="radio-1"
                                type="radio"
                                name="option"
                                onClick={() => HandlerClick("Vestimentas")}
                            />
                            <label htmlFor="radio-1">Vestimentas</label>
                        </div>
                        <div>
                            <input
                                id="radio-2"
                                type="radio"
                                name="option"
                                onClick={() => HandlerClick("Intrumentos")}
                            />
                            <label htmlFor="radio-2">Instrumentos</label>
                        </div>
                        <div>
                            <input
                                id="radio-3"
                                type="radio"
                                name="option"
                                onClick={() => HandlerClick("Artigos")}
                            />
                            <label htmlFor="radio-3">Artigos</label>
                        </div>
                        <div>
                            <input
                                id="radio-4"
                                type="radio"
                                name="option"
                                onClick={() => HandlerClick("Quadros")}
                            />
                            <label htmlFor="radio-4">Quadros</label>
                        </div>
                    </form>
                    <div className="preco">
                        <div id="preco">
                            <h3>PREÇO</h3>
                        </div>
                        <div id="quant">
                            <input
                                type="number"
                                id="max"
                                placeholder="Mínimo"
                                onChange={(e) => setMin(e.target.value)}
                            />
                            <p id="linha">-</p>
                            <input
                                type="number"
                                id="min"
                                placeholder="Máximo"
                                onChange={(e) => setMax(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {itens
                    .filter((item) => 
                        item.nome.toLowerCase().includes(filtro.toLowerCase()) &&
                        item.categoria.toLowerCase().includes(filtroCat.toLowerCase()) &&
                        filtroPreco(item.preco)
                    )
                    .map((item, index) => (
                        <CardOferta
                            key={index}
                            categoria={item.categoria}
                            imagem={item.imagem}
                            preco={item.preco}
                            nome={item.nome}
                        />
                    ))}
            </div>
        </div>
    );
}

export { FundoCard };

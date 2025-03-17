import React, { useState, useEffect } from "react";
import './fundo-card-css.css';
import oferta from '../assets/oferta.svg';
import camisa from '../assets/camiseta.png';
import { CardOferta } from "./card-ofertas";
import { myService } from "../service/ProductsService";

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
        return preco >= minParse && preco <= maxParse;
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
                                onClick={() => HandlerClick("Instrumentos")}
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
                        item.name.toLowerCase().includes(filtro.toLowerCase()) &&
                        // (item.categoria?.name)==filtroCat &&
                        filtroPreco(item.price)
                    )
                    .map((item, index) => (
                        <CardOferta
                            key={index}
                            categoria={item.category?.name }
                            imagem={item.url_photo || camisa}
                            preco={item.price}
                            nome={item.name}
                            id={item.id}
                        />
                    ))}
            </div>
        </div>
    );
}

export { FundoCard };

import React, { useState, useEffect } from "react";
import './fundo-card-css.css';
import camisa from '../assets/camiseta.png';
import { CardOferta } from "./card-ofertas";

function FundoCard({ filtro, titulo, i, itens }) {
    const [filtroCat, setFiltroCat] = useState("");
    const [minValor, setMin] = useState("");
    const [maxValor, setMax] = useState("");
    const [categorias, setCategorias] = useState([]);

    const getCategorias = async () => {
        try {
            const response = await fetch(`http://localhost:3000/categories`);
            const data = await response.json();
            setCategorias(data);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };
    useEffect(() => {
        getCategorias();
    }, []);

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
                        {categorias.map((categoria) => (
                            <div key={categoria.id}>
                                <input
                                    id={`radio-${categoria.id}`}
                                    type="radio"
                                    name="option"
                                    onClick={() => setFiltroCat(categoria.name)}
                                />
                                <label htmlFor={`radio-${categoria.id}`}>{categoria.name}</label>
                            </div>
                        ))}
                    </form>

                    <div className="preco">
                        <div id="preco">
                            <h3>PREÇO</h3>
                        </div>
                        <div id="quant">
                            <input
                                type="number"
                                id="min"
                                placeholder="Mínimo"
                                onChange={(e) => setMin(e.target.value)}
                            />
                            <p id="linha">-</p>
                            <input
                                type="number"
                                id="max"
                                placeholder="Máximo"
                                onChange={(e) => setMax(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {itens
                    .filter((item) =>
                        item.name.toLowerCase().includes(filtro.toLowerCase()) &&
                        (!filtroCat || item.category?.name === filtroCat) &&
                        filtroPreco(item.price)
                    )
                    .map((item, index) => (
                        <CardOferta
                            key={index}
                            categoria={item.category?.name}
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

import { useEffect } from "react";
import style from "./produto.module.css"
import lixo from "../assets/lixeira.svg"

interface tipos{
    id:number;
    categoria:string;
    imagem:any;
    preco:number;
    nome:string;
}

function Produto({id, categoria, imagem, preco, nome}:tipos){


    return(
        <div className={style.tudo}>
            <div className={style.imagem}>
                <img src={imagem} />
            </div>
            <div className={style.info}>
                <h3>{nome}</h3>
                <div id="cod">
                    <p>Categoria: {categoria}</p>
                    <p>Código: {id}</p>
                </div>
                <div id={style.quant}>
                    <div id={style.choose}>
                        <p>-</p>
                        <input type="text"/>
                        <p>+</p>
                    </div>
                    <img src={lixo} />
                </div>
            </div>
            <div className={style.preco}>
                <p>R$ {(preco).toFixed(2).replace(".",",")}</p>
            </div>
        </div>
    )
}

export {Produto}
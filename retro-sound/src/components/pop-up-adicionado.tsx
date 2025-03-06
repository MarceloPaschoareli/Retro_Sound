import React, { useEffect } from "react";
import "./adicionado.css";
import certo from "../assets/verified.gif";

interface Tipo {
    open: boolean;
}

function AdicionadoPopUp({ open }: Tipo) {

    useEffect(() => {
        const tela = document.getElementById("pop");

        if (tela) {
            tela.style.display = open ? "flex" : "none";
        }
    }, [open]);

    return (
        <div id="pop">
            <div className="mensa">
                <img src={certo} alt="Ícone de verificado" />
                <p>ADICIONADO AO CARRINHO</p>
            </div>
        </div>
    );
}

export { AdicionadoPopUp };

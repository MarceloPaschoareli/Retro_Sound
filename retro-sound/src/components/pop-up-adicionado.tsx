import React, { useEffect } from "react";
import "./adicionado.css";
import certo from "../assets/verified.gif";

interface Tipo {
    open: boolean;
    texto:string;
}

function AdicionadoPopUp({ open, texto }: Tipo) {

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
                <p>{texto}</p>
            </div>
        </div>
    );
}

export { AdicionadoPopUp };

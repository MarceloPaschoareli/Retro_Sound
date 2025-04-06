import { useEffect, useState } from "react";
import style from "./excluir.module.css";
import { myService } from "../../service/ProductsService";

interface Tipo {
    open: boolean;
    onClose: () => void;
    imagem:any;
    nome:string;
    id:number;
}

// Tipagem para categoria
interface Categoria {
    id: number;
    name: string;
}

// Função para buscar categorias
const getCategorias = async (): Promise<Categoria[]> => {
    try {
        const response = await fetch(`http://localhost:3000/categories`);
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        return [];
    }
};

function RemoverProduto({ open, onClose, imagem, nome, id }: Tipo) {

    useEffect(() => {
        const tela = document.getElementById("pop");
        if (tela) {
            tela.style.display = open ? "flex" : "none";
        }
    }, [open]);

    const Excluir = async () => {
        const response = myService.excluirProduto(id)
        window.location.reload()
    };

    return (
        <div className={style.content} id="pop" onClick={onClose}>
            <div className={style.quadro} onClick={(e) => e.stopPropagation()}>
                <h3>Tem certeza que deseja <span>remover</span> o seguinte produto</h3>
                <div className={style.produto}>
                    <img src={imagem} />
                    <p>{nome}</p>
                </div>
                <button onClick={Excluir}>CONFIRMAR</button>
            </div>
        </div>
    );
}

export { RemoverProduto };

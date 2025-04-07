import { useEffect, useState } from "react";
import style from "./produto.module.css";
import lixo from "../../assets/lixeira.svg";
import { CarrinhoService } from "../../service/CarrinhoService";
import { myService } from "../../service/ProductsService";
import { RemoverProduto } from "../../components/popup-excluir/excluir";
import editar from "../../assets/editar.svg"
import { EditarProduto } from "../popup-editar/editar";


interface tipos {
    id: number;
    categoria: string;
    imagem: any;
    preco: number;
    nome: string;
    descricao: string;
    stock:number;
}

function ProdutoAdmin({ id, categoria, imagem, preco, nome, descricao, stock}: tipos) {
    const [open2, setOpen2] = useState(false);
    const [open, setOpen] = useState(false);


    return (
        <div className={style.tudo}>
            <div className={style.imagem}>
                <img src={imagem} />
            </div>
            <div className={style.info}>
                <h3>{nome}</h3>
                <div id="cod" className={style.cod}>
                    <p>Categoria: {categoria}</p>
                    <p>Código: {id}</p>
                </div>
                <div id={style.quant}>
                    <img src={lixo} onClick={() => setOpen2(true)}/>
                    <img src={editar} onClick={() => setOpen(true)} />
                </div>
            </div>
            <div className={style.preco}>
                <p>R$ {(preco).toFixed(2)}</p>
            </div>
            {open2 && <RemoverProduto open={open2} onClose={()=> setOpen2(false)} imagem={imagem} nome={nome} id={id}></RemoverProduto>}
            {open && <EditarProduto open={open} onClose={()=> setOpen(false)} nome1={nome} preco1={preco} categoria1={categoria} imagem1={imagem} descricao1={descricao} stock1={stock} id1={id}></EditarProduto>}
        </div>
    );
}

export { ProdutoAdmin };

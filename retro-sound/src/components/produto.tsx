import { useEffect } from "react";
import style from "./produto.module.css";
import lixo from "../assets/lixeira.svg";
import { CarrinhoService } from "../service/CarrinhoService";

interface tipos {
    id: number;
    categoria: string;
    imagem: any;
    preco: number;
    nome: string;
    quant: number;
    stock:number;
    atualizarCarrinho: (idProduto: number) => void; 
}

function Produto({ id, categoria, imagem, preco, nome, quant, atualizarCarrinho, stock }: tipos) {

    const diminuir = async () =>{
        const carrinhoString = sessionStorage.getItem("Carrinho");

         if (!carrinhoString) {
        console.error("Erro: Dados do carrinho não encontrados!");
        return;
        }

        const carrinhoData = JSON.parse(carrinhoString);

        if (!carrinhoData || !carrinhoData.id) {
        console.error("Erro: ID do carrinho não encontrado!", carrinhoData);
        return;
        }
        if(quant!==1){
         console.log(CarrinhoService.atualizarQuant(carrinhoData.id,id,-1))
         preco = preco * quant;
         window.location.reload()
        }
    }

    const aumentar = async () =>{
        const carrinhoString = sessionStorage.getItem("Carrinho");

         if (!carrinhoString) {
        console.error("Erro: Dados do carrinho não encontrados!");
        return;
        }

        const carrinhoData = JSON.parse(carrinhoString);

        if (!carrinhoData || !carrinhoData.id) {
        console.error("Erro: ID do carrinho não encontrado!", carrinhoData);
        return;
        }
        if(quant!==stock){
        console.log(CarrinhoService.atualizarQuant(carrinhoData.id,id,1))
        window.location.reload()
        }
    }

    const Excluir = async () => {
        const Caid = sessionStorage.getItem("Carrinho");

        if (!Caid) {
            console.error("Carrinho não encontrado no sessionStorage");
            return;
        }

        const carrinho = JSON.parse(Caid);
        const cartId = carrinho.id; 

        if (!cartId) {
            console.error("Erro: cartId indefinido");
            return;
        }

        try {
            await CarrinhoService.removerItem(cartId, id);
            atualizarCarrinho(id); 
        } catch (error) {
            console.error("Erro ao remover item do carrinho:", error);
        }
    };

    return (
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
                        <p onClick={diminuir}>-</p>
                        <span id={style.num}>{quant}</span>
                        <p onClick={aumentar}>+</p>
                    </div>
                    <img src={lixo} onClick={Excluir} />
                </div>
            </div>
            <div className={style.preco}>
                <p>R$ {(preco*quant).toFixed(2)}</p>
            </div>
        </div>
    );
}

export { Produto };

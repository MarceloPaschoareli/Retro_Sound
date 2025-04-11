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
    stock: number;
    atualizarCarrinho: (idProduto: number, novaQuantidade: number) => void;
}

function Produto({ id, categoria, imagem, preco, nome, quant, atualizarCarrinho, stock }: tipos) {

    const diminuir = async () => {
        if (quant > 1) {
            const carrinhoData = JSON.parse(sessionStorage.getItem("Carrinho") || "{}");
            await CarrinhoService.atualizarQuant(carrinhoData.id, id, -1);
            atualizarCarrinho(id, quant - 1);
        }
    };

    const aumentar = async () => {
        if (quant < stock) {
            const carrinhoData = JSON.parse(sessionStorage.getItem("Carrinho") || "{}");
            await CarrinhoService.atualizarQuant(carrinhoData.id, id, 1);
            atualizarCarrinho(id, quant + 1);
        }
    };

    const Excluir = async () => {
        const carrinhoData = JSON.parse(sessionStorage.getItem("Carrinho") || "{}");
        await CarrinhoService.removerItem(carrinhoData.id, id);
        atualizarCarrinho(id, 0);
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
                <p>R$ {(preco * quant).toFixed(2)}</p>
            </div>
        </div>
    );
}

export { Produto };

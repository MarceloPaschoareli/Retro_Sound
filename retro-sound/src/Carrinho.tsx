import styles from "./Carrinho.module.css"
import { NavBar } from "./components/nav-bar"
import { useEffect, useState } from "react";
import camisa from "./assets/camiseta.png"
import { Produto } from "./components/produto";
import vazio from "./assets/vazio.svg"
import { useNavigate } from "react-router-dom";
import Caminho from "./assets/carrinho/Caminho.svg"
import { CarrinhoService } from "./service/CarrinhoService";

interface ProdutoCarrinho {
    quantity:number;
    product:{
    id:number;
    category: string;
    url_photo: string; 
    price: number;
    name: string;
    stock:number
    }
}



function Carrinho() {
    const [filtro, setFiltro] = useState("");
    const [valor, setValor] = useState(0);
    const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const carrinhoSalvo = sessionStorage.getItem("Carrinho");
        if (carrinhoSalvo) {
            setCarrinho(JSON.parse(carrinhoSalvo));
        }
    }, []);

    useEffect(() => {
        const visualizarProdutos = async () => {
            const idUsuario = Number(sessionStorage.getItem("idUsuario"));
            if (!idUsuario) return;
    
            try {
                const response = await CarrinhoService.getCarrinho(idUsuario);
    
                if (!response) {
                    console.error("Erro: Resposta da API está vazia.");
                    return;
                }
    
                const carrinhoData = {
                    id: response.id,
                    items: response.items || []
                };
    
                setCarrinho(carrinhoData.items);
    
                const total = response.items.reduce((acc: number, item: ProdutoCarrinho) => {
                    return acc + item.product.price * item.quantity;
                }, 0);
    
                setValor(total);
    
                sessionStorage.setItem("Carrinho", JSON.stringify(carrinhoData));
    
                console.log("Carrinho salvo corretamente no sessionStorage:", carrinhoData);
            } catch (error) {
                console.error("Erro ao buscar o carrinho:", error);
            }
        };
    
        visualizarProdutos();
    }, []);
    

    const removerDoCarrinho = (idProduto: number) => {
        const carrinhoSalvo = JSON.parse(sessionStorage.getItem("Carrinho") || "{}");
    
        const novoCarrinho = carrinhoSalvo.items.filter((item: ProdutoCarrinho) => item.product.id !== idProduto);
    
        setCarrinho(novoCarrinho);
    
        sessionStorage.setItem("Carrinho", JSON.stringify({
            id: carrinhoSalvo.id,
            items: novoCarrinho
        }));
    };
    
    
    
    
    useEffect(() => {
        const carrinhoSalvo = sessionStorage.getItem("Carrinho");
        const carrinhoAtualizado = {
            id: carrinhoSalvo ? JSON.parse(carrinhoSalvo).id : null,
            items: carrinho
        };
    
        sessionStorage.setItem("Carrinho", JSON.stringify(carrinhoAtualizado));
    }, [carrinho]);
    
    

    const Voltar = () => {
        navigate("/");
    };

    const pagarCarrinho = () => {
        navigate("/"+Math.random()*1000+"/"+valor)
    };
    

    return (
        <div className={styles.tudo}>
            <NavBar setFiltro={setFiltro} bolinha={carrinho.length} />
            {carrinho.length > 0 ? (
                <div className={styles.conteudoC}>
                    <div className={styles.scar}>
                        <div className={styles.caminho}>
                            <img src={Caminho} />
                        </div>
                        <div className={styles.carrinhoC}>
                            <div className={styles.lista}>
                            {carrinho.map((carro, index) => (
                                    <Produto 
                                    id={carro.product.id}
                                    categoria={carro.product.category}
                                    imagem={carro.product.url_photo}
                                    preco={carro.product.price}
                                    nome={carro.product.name}
                                    quant={carro.quantity}
                                    atualizarCarrinho={removerDoCarrinho}
                                    stock={carro.product.stock}
                                />                                
                                ))}
                            </div>

                            <div id={styles.valor}>
                                <div id={styles.pagamento}>
                                    <span>Resumo:</span>
                                    <hr />
                                    <div id={styles.valores}>
                                        <p>Valores dos Produtos:</p>
                                        <span>{valor.toFixed(2)}</span>
                                    </div>
                                    <hr />
                                    <div id={styles.valores}>
                                        <p>Frete:</p>
                                        <span>R$10.00</span>
                                    </div>
                                    <hr />
                                    <div id={styles.valores}>
                                        <p>Valor Final:</p>
                                        <span>R${(valor + 10).toFixed(2)}</span>
                                    </div>
                                </div>

                                <div id={styles.confirmar}>
                                    <button id={styles.pagar} onClick={pagarCarrinho}>IR PARA O PAGAMENTO</button>
                                    <button id={styles.continuar} onClick={Voltar}>CONTINUAR COMPRANDO</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.conteudoC}>
                    <div className={styles.vazio}>
                        <div id={styles.imagemV}>
                            <img src={vazio} />
                        </div>
                        <div id={styles.aviso}>
                            <h4>Seu carrinho está vazio! :{"("}</h4>
                            <p>Adicione produtos ao seu carrinho e eles aparecerão aqui!</p>
                            <button id={styles.pagar} onClick={Voltar}>Ver mais Produtos</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Carrinho;

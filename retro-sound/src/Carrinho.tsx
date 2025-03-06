import styles from "./Carrinho.module.css"
import { NavBar } from "./components/nav-bar"
import { useEffect, useState } from "react";
import camisa from "./assets/camiseta.png"
import { Produto } from "./components/produto";
import vazio from "./assets/vazio.svg"
import { useNavigate } from "react-router-dom";
import Caminho from "./assets/Caminho.svg"

interface ProdutoCarrinho {
    categoria: string;
    imagem: string;
    preco: number;
    nome: string;
}

function Carrinho() {
    const [filtro, setFiltro] = useState("");

    const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);


    useEffect(() => {
        setCarrinho([{categoria: "Vestimentas", imagem: camisa, preco: 120.00, nome: "Camisa The Bleatles"}]    )

        document.body.style.backgroundColor = "white";
    
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const navigate = useNavigate()

    const Voltar = () => {
        navigate("/")
    }


    return (
        <div className={styles.tudo}>
            <NavBar setFiltro={setFiltro}></NavBar>
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
                                        key={index}
                                        id={index}
                                        categoria={carro.categoria}
                                        preco={carro.preco}
                                        imagem={carro.imagem}
                                        nome={carro.nome}
                                    />
                                ))}
                            </div>

                            <div id={styles.valor}>
                                <div id={styles.pagamento}>
                                    <span>Resumo:</span>
                                    <hr />
                                    <div id={styles.valores}>
                                        <p>Valores dos Produtos:</p>
                                        <span>R${(1900.00).toFixed(2).replace(".", ",")}</span>
                                    </div>
                                    <hr />
                                    <div id={styles.valores}>
                                        <p>Frete:</p>
                                        <span>R${(10.00).toFixed(2).replace(".", ",")}</span>
                                    </div>
                                    <hr />
                                    <div id={styles.valores}>
                                        <p>Valor Final:</p>
                                        <span>R${(1910.00).toFixed(2).replace(".", ",")}</span>
                                    </div>
                                </div>

                                <div id={styles.confirmar}>
                                    <button id={styles.pagar}>IR PARA O PAGAMENTO</button>
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
                            <button id={styles.pagar}>Ver mais Produtos</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Carrinho;

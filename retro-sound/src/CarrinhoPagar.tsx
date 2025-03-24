import styles from "./Carrinho.module.css"
import { NavBar } from "./components/nav-bar"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Caminho from "./assets/carrinho/Caminho2.svg"
import Caminho3 from "./assets/carrinho/caminho3.svg"
import money from "./assets/money.svg"
import pix from "./assets/pix.svg"

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



function CarrinhoPagar() {
    const [filtro, setFiltro] = useState("");
    const [valor, setValor] = useState(0);
    const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);
    const [option, setOption] = useState("");   
    const [caminho, setCaminho] = useState(Caminho);

    const navigate = useNavigate();
 
    

    const Voltar = () => {
        window.history.back()
    };

    const pagarCarrinho = () => {
        if(option!==""){
            if (option==="PIX"){
                const v = document.getElementById("visivel");
                if (v){
                    v.style.display="flex";
                }
            
            }
            const s = document.getElementById("sla");
            if(s){
                s.style.display="none";
            }
            setCaminho(Caminho3)
        }
    };

    const opcaoPag = (opcao:string) =>{
        setOption(opcao)
    }
    

    return (
        <div className={styles.tudo}>
            <NavBar setFiltro={setFiltro} bolinha={carrinho.length} />
            <div className={styles.conteudoC}>
                    <div className={styles.scar}>
                        <div className={styles.caminho}>
                            <img src={caminho} id="caminho" />
                        </div>

                        <div id="visivel" className={styles.visivel}>
                    <img src={pix} />
                </div>

                        <div id="sla">
                        <div className={styles.carrinhoC}>

                            <div className={styles.options}>
                                <div className={styles.titul}>
                                    <img src={money}/>
                                    ESCOLHA SUA FORMA DE PAGAMENTO
                                </div>

                                <form className="my-form"id={styles.op}>
                                    <div>
                                        <input
                                            id="radio-1"
                                            type="radio"
                                            name="option"
                                            onClick={() => opcaoPag("PIX")}
                                        />
                                        <label htmlFor="radio-1">PIX</label>
                                    </div>
                                    <div>
                                        <input
                                            id="radio-2"
                                            type="radio"
                                            name="option"
                                            onClick={() => opcaoPag("CARTAO")}
                                        />
                                        <label htmlFor="radio-2">CARTÃO DE CRÉDITO</label>
                                    </div>
                                    </form>
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
                                    <button id={styles.pagar} onClick={pagarCarrinho}>CONTINUAR</button>
                                    <button id={styles.continuar} onClick={Voltar}>VOLTAR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
               </div> 
)}

export default CarrinhoPagar;

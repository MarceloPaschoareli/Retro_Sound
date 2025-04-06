import styles from "./Carrinho.module.css"
import { NavBar } from "./components/nav-bar"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Caminho from "./assets/carrinho/Caminho2.svg"
import Caminho3 from "./assets/carrinho/caminho3.svg"
import money from "./assets/money.svg"
import pix from "./assets/pix.svg"
import {Cartao} from "./components/cartao/cartao"
import jsPDF from "jspdf";

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

    

    const { number } = useParams(); 

    useEffect(() => {
    if (number) {
        setValor(Number(number));
    }
    }, [number]);


    const Voltar = () => {
        window.history.back()
    };

    const pagarCarrinho = () => {
        if (option !== "") {
            console.log(`Opção selecionada: ${option}`); // Debug no console
    
            // Oculta a seleção de pagamento
            const selecaoPagamento = document.getElementById("sla");
            if (selecaoPagamento) {
                selecaoPagamento.style.display = "none";
            }
    
            // Exibe a tela correspondente à opção escolhida
            const pixElement = document.getElementById("visivel");
            const cartaoElement = document.getElementById("invisivel");
    
            if (option === "PIX") {
                if (pixElement) {
                    pixElement.style.display = "flex";
                    pixElement.style.visibility = "visible";
                    pixElement.style.opacity = "1";
                    console.log("Exibindo PIX");
                }
                if (cartaoElement) {
                    cartaoElement.style.display = "none";
                }
            } else if (option === "CARTAO") {
                if (cartaoElement) {
                    cartaoElement.style.display = "block"; // Alternativa: "flex" se necessário
                    cartaoElement.style.visibility = "visible";
                    cartaoElement.style.opacity = "1";
                    console.log("Exibindo Cartão");

                    console.log(cartaoElement); // Verifica se o elemento foi encontrado
console.log(getComputedStyle(cartaoElement).display); // Vê qual display está sendo aplicado

                }
                if (pixElement) {
                    pixElement.style.display = "none";
                }
            }
    
            // Atualiza o caminho da interface
            setCaminho(Caminho3);
            
        } else {
            alert("Por favor, selecione uma forma de pagamento.");
        }
    };
    

    

    

    const opcaoPag = (opcao:string) =>{
        setOption(opcao)
    }


    const gerarPDF = () => {
        const doc = new jsPDF();
        const valorFinal = valor + 10;

        doc.text("Recibo de Compra", 10, 10);
        doc.text(`Valor dos produtos: R$ ${valor.toFixed(2)}`, 10, 20);
        doc.text("Frete: R$ 10.00", 10, 30);
        doc.text(`Valor Final: R$ ${valorFinal.toFixed(2)}`, 10, 40);

        doc.save("recibo_compra.pdf");
    }

    const Compra = () =>{
        window.location.reload()

        gerarPDF()
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
                            <div id={styles.po}>
                                <div id={styles.actions}>
                                    <button id={styles.pagar} onClick={Compra}>FINALIZAR COMPRA</button>
                                </div>
                    </div>

                </div>

                <div id="invisivel" className={styles.invisivel}>
                        <Cartao valor={valor}></Cartao>
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

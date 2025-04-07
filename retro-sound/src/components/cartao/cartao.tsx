import { useState } from "react"
import style from "./cartao.module.css"
import cartoes from "../../assets/cartoes-aceitos.svg"
import { CarrinhoService } from "../../service/CarrinhoService"
import { AdicionadoPopUp } from "../pop-up-adicionado"
import jsPDF from "jspdf"
import { useNavigate } from "react-router-dom"

interface tipo {
    valor: number;
}

function Cartao({ valor }: tipo) {

    const [numeroCartao, setNumeroCartao] = useState("")
    const [nomeTitular, setNomeTitular] = useState("")
    const [validade, setValidade] = useState("")
    const [cvv, setCvv] = useState("")
    const [parcelamento, setPar] = useState("")
    const [carrinho2, setCarrinho2] = useState(false);
    const [erro, setErro] = useState("")

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const navigate = useNavigate()

    const gerarPDF = () => {
        const doc = new jsPDF();
        const valorFinal = valor + 10;

        doc.text("Recibo de Compra", 10, 10);
        doc.text(`Valor dos produtos: R$ ${valor.toFixed(2)}`, 10, 20);
        doc.text("Frete: R$ 10.00", 10, 30);
        doc.text(`Valor Final: R$ ${valorFinal.toFixed(2)}`, 10, 40);

        doc.save("recibo_compra.pdf");
    }

    const validarCampos = () => {
        const regexNumero = /^\d{16}$/;
        const regexNome = /^[A-Za-zÀ-ÿ]{2,}(?:\s[A-Za-zÀ-ÿ]{2,})+$/;
        const regexValidade = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const regexCvv = /^\d{3,4}$/;

        if (!regexNumero.test(numeroCartao)) {
            setErro("Número do cartão inválido. Deve conter 16 dígitos.");
            return false;
        }
        if (!regexNome.test(nomeTitular)) {
            setErro("Nome do titular inválido. Insira nome e sobrenome.");
            return false;
        }
        if (!regexValidade.test(validade)) {
            setErro("Validade inválida. Use o formato MM/AA.");
            return false;
        }
        if (!regexCvv.test(cvv)) {
            setErro("CVV inválido. Deve conter 3 ou 4 dígitos.");
            return false;
        }
        if (!parcelamento) {
            setErro("Selecione uma opção de parcelamento.");
            return false;
        }

        setErro(""); // Tudo certo
        return true;
    }

    const confirmar = async () => {
        if (!validarCampos()) return;

        const carrinhoData1 = sessionStorage.getItem("Carrinho");
        const user = sessionStorage.getItem("idUsuario")

        if (!carrinhoData1) {
            console.error("Erro: Carrinho não encontrado no sessionStorage!");
            return;
        }

        const carrinhoData = JSON.parse(carrinhoData1);

        const response = await CarrinhoService.checkoutCarrinho(carrinhoData.id, Number(user))

        setCarrinho2(true);
        await sleep(2000);
        setCarrinho2(false);

        console.log(response)

        navigate("/")

        gerarPDF()
    }

    return (
        <div className={style.content}>
            <div className={style.quadro} onClick={(e) => e.stopPropagation()}>
                <img src={cartoes} />
                <div id={style.infos}>
                    <div id={style.email}>
                        <input type="text" placeholder="NÚMERO DO CARTÃO DE CRÉDITO" onChange={(e) => setNumeroCartao(e.target.value)} required />
                    </div>
                    <div id={style.email}>
                        <input type="text" placeholder="NOME DO TITULAR DO CARTÃO" onChange={(e) => setNomeTitular(e.target.value)} required />
                    </div>
                    <div id={style.email}>
                        <input type="text" placeholder="VALIDADE (MM/AA)" onChange={(e) => setValidade(e.target.value)} required />
                    </div>
                    <div id={style.email}>
                        <input type="text" placeholder="CÓDIGO (CVV)" onChange={(e) => setCvv(e.target.value)} required />
                    </div>
                    <div className={style.selectContainer}>
                        <select onChange={(e) => setPar(e.target.value)} required>
                            <option value="">PARCELAMENTO</option>
                            <option value="Á VISTA">Á VISTA</option>
                            <option value="2X">2X</option>
                            <option value="3X">3X</option>
                        </select>
                    </div>
                    <div>

                    </div>
                    {erro && <p style={{ color: "red", margin: "0vh", marginTop: "0.5vh", marginLeft: "9vh" }}>{erro}</p>}
                    <button onClick={confirmar}>CONFIRMAR PAGAMENTO</button>
                    <AdicionadoPopUp open={carrinho2} texto="PAGAMENTO BEM SUCEDIDO" />
                </div>
            </div>
        </div>
    )
}

export { Cartao }

import React, { useEffect, useState } from "react";
import { NavBar } from "./components/nav-bar";
import { useNavigate, useParams } from "react-router-dom";
import './produto-css.css'
import imagem from './assets/camiseta.svg'
import { OutrosCard } from "./components/card-outros";
import info from "./assets/info.svg"
import { myService } from "./service/ProductsService";
import { Produto } from "./components/produto";
import { CarrinhoService } from "./service/CarrinhoService";
import { AdicionadoPopUp } from "./components/pop-up-adicionado";
import { cookies } from "./hooks/cookie";

type Produto = {
    name: string;
    price: number;
    description: string;
    url_photo: string;
    id:number;
  };

  


function AppProduto(){

    const carrinhoSalvo = sessionStorage.getItem("Carrinho");
    const carrinho = carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
    const quantidadeItens = carrinho.length || 0;

    const navigate = useNavigate()


    const {nome, id} = useParams()
    const [filtro , setFiltro] = useState("")
    const [produto, setProduto] = useState<Produto | null>(null);
    const[products,setProducts] = useState<Produto[]>([])
    const [carrinho2, setCarrinho2] = useState(false); 

    function sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    const Click = async () => {
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

    console.log("Adicionando ao carrinho ID:", carrinhoData.id);

    await CarrinhoService.adicionarItem(carrinhoData.id, Number(id));

    setCarrinho2(true);
    await sleep(2000);
    setCarrinho2(false);
};

useEffect (() =>{
    cookies.inicializarSessionStorage()
    if (!cookies.verificarLogin()){
      navigate("/login")
    }
  }, [])

    useEffect(() => {
        const fetchProduto = async () => {
            if (id) {
                try {
                    const response = await myService.getId(id);
                    setProduto(response);
                } catch (error) {
                    console.error("Erro ao buscar produto:", error);
                }
            }
        };

        const fetchProdutos = async () => {
            try {
                const response = await myService.getAll();
                setProducts(response);
                console.log(response)
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProduto();
        fetchProdutos();
    }, [id]);

    return (
        <div>
            <NavBar setFiltro={setFiltro} bolinha={quantidadeItens}></NavBar>
            <div className="content">
                <div className="produto">
                    <div id="titulo">
                        <h2>{produto?.name}</h2>
                    </div>
                    <div id="info">
                        <img src={produto?.url_photo} id="imagem"/>
                        <div className="other">
                            <div id="pag">
                            <div id="preco">
                                <div className="preco1">
                                    <span>R$ {(produto?.price ? (produto.price * 1.10).toFixed(2) : "0.00")}</span>
                                    <p>R$ {(produto?.price ?? 0).toFixed(2)}</p>
                                </div>
                                <div id="parcela">Em até 10x sem juros no cartão</div>
                            </div>
                                
                                <input type="button" value="ADICIONAR AO CARRINHO" className="h3" onClick={Click}/>
                            </div>
                            <div className="outros">
                                <p>OUTROS PRODUTOS</p>
                                <div id="produtos-outros">
                                    {products.slice(0,5).map((item, index) =>
                                        <OutrosCard
                                        nome="camisa"
                                        preco={item.price}
                                        imagem={item.url_photo}
                                        id={item.id}
                                        ></OutrosCard>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="separador">
                    .
                </div>
            
            <div className="content2">
                    <div className="descricao">
                        <div id="titulo2">
                            <img src={info}/>
                            <h2>Descrição do Produto</h2>
                        </div>
                        <p>
                        {produto?.description}
                        </p>
                    </div>
            </div>

            <AdicionadoPopUp open={carrinho2} texto="ADICIONADO AO CARRINHO"></AdicionadoPopUp>
        </div>


        
    )
}

export default AppProduto

function sleep(arg0: number) {
    throw new Error("Function not implemented.");
}

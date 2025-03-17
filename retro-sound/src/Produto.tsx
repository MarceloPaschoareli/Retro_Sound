import React, { useEffect, useState } from "react";
import { NavBar } from "./components/nav-bar";
import { useParams } from "react-router-dom";
import './produto-css.css'
import imagem from './assets/camiseta.svg'
import { OutrosCard } from "./components/card-outros";
import info from "./assets/info.svg"
import { myService } from "./service/ProductsService";
import { Produto } from "./components/produto";
type Produto = {
    name: string;
    price: number;
    description: string;
    url_photo: string;
  };

  

const itens = [{preco:25.00,img:imagem},{preco:25.00,img:imagem},{preco:25.00,img:imagem},{preco:25.00,img:imagem},{preco:25.00,img:imagem}]

function AppProduto(){

    const {nome, id} = useParams()
    const [filtro , setFiltro] = useState("")
    const [produto, setProduto] = useState<Produto | null>(null);
    const[products,setProducts] = useState<Produto[]>([])

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
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProduto();
        fetchProdutos();
    }, [id]);

    return (
        <div>
            <NavBar setFiltro={setFiltro}></NavBar>
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
                                    <span>R$ {(produto?.price ? (produto.price * 0.90).toFixed(2) : "0.00")}</span>
                                    <p>R$ {(produto?.price ?? 0).toFixed(2)}</p>
                                </div>
                                <div id="parcela">Em até 10x sem juros no cartão</div>
                            </div>
                                
                                <input type="button" value="ADICIONAR AO CARRINHO" className="h3"/>
                            </div>
                            <div className="outros">
                                <p>OUTROS PRODUTOS</p>
                                <div id="produtos-outros">
                                    {products.slice(0,5).map((item, index) =>
                                        <OutrosCard
                                        nome="camisa"
                                        preco={item.price}
                                        imagem={item.url_photo}
                                        id={index}
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
        </div>
        
    )
}

export default AppProduto
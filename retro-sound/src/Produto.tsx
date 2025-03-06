import React, { useState } from "react";
import { NavBar } from "./components/nav-bar";
import { useParams } from "react-router-dom";
import './produto-css.css'
import imagem from './assets/camiseta.svg'
import { OutrosCard } from "./components/card-outros";
import info from "./assets/info.svg"

const itens = [{preco:25.00,img:imagem},{preco:25.00,img:imagem},{preco:25.00,img:imagem},{preco:25.00,img:imagem},{preco:25.00,img:imagem}]

function AppProduto(){

    const {nome, id} = useParams()
    const [filtro , setFiltro] = useState("")

    return (
        <div>
            <NavBar setFiltro={setFiltro}></NavBar>
            <div className="content">
                <div className="produto">
                    <div id="titulo">
                        <h2>{nome}</h2>
                    </div>
                    <div id="info">
                        <img src={imagem} id="imagem"/>
                        <div className="other">
                            <div id="pag">
                                <div id="preco">
                                    <span>R$169,90</span>
                                    <p>R$120,00</p>
                                    <div id="parcela">Em até 10x sem juros no cartão</div>
                                </div>
                                
                                <input type="button" value="ADICIONAR AO CARRINHO" className="h3"/>
                            </div>
                            <div className="outros">
                                <p>OUTROS PRODUTOS</p>
                                <div id="produtos-outros">
                                    {itens.map((item, index) =>
                                        <OutrosCard
                                        nome="camisa"
                                        preco={item.preco}
                                        imagem={item.img}
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
                        Lendário quarteto de Liverpool formado por John Lennon, Paul McCartney, Geoge Harrison e Ringo Star. Para muitos a maior banda de todos os tempos.
Camiseta fabricada em malha 100% algodão premium fio 30-1 com certificado BCI. As peças passam por um processo de lavagem especial deixando-as com textura aveludada, toque macio e encolhimento zero.
 Tecido 100% algodão premium
 Certificação better cotton initiative
 Estampa em silk resistente a lavagens 
 Alta qualidade de costura
 Malha premium de alta durabilidade
                        </p>
                    </div>
            </div>
        </div>
        
    )
}

export default AppProduto
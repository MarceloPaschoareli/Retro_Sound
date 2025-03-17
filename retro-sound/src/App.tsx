import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/nav-bar';
import { FundoCard } from './components/fundo-cards';
import { AdicionadoPopUp } from './components/pop-up-adicionado';
import oferta from './assets/oferta.svg';
import procurados from './assets/procurados.svg'
import produto from './assets/produto.svg'
import camisa from './assets/camiseta.png'
import guitarra from './assets/guitarra.png'
import { myService } from './service/ProductsService';
import { cookies } from './hooks/cookie';
import { useNavigate } from 'react-router-dom';

function App() {
  const [filtro, setFiltro] = useState("");
  const [itens, setItens] = useState([]); 
  const [response3, setResponse] = useState(null)

  const navigate = useNavigate()


  useEffect (() =>{
    cookies.inicializarSessionStorage()
    if (!cookies.verificarLogin()){
      navigate("/login")
    }
  }, [])

  useEffect  (() =>{
        if (!cookies.verificarLogin()){
            navigate("/login")
        }
    }, [])

  useEffect(() => {
    const fetchItens = async () => {
        try {
            const response = await myService.getAll();
            const response2 = await myService.getId("44")
            setItens(response); 
            setResponse(response2.name)
        } catch (error) {
            console.error("Erro ao buscar os itens:", error);
        }
    };

    fetchItens(); 
  }, []); 

  useEffect(() => {
    const elemento = document.getElementById("prod");
    const elemento2 = document.getElementById("searchs")
    if (elemento) {
      elemento.style.display = filtro ? "none" : "block";
    }
    if( elemento2){
      elemento2.style.display = filtro ? "block" : "none";
    }
  }, [filtro])

  return (
    <div className="App">
      <NavBar setFiltro={setFiltro} />
        <div className="corpo">
        <div id="prod">
          <FundoCard filtro={filtro} titulo={"OFERTAS E PROMOÇÕES"} i={oferta} itens={itens}/>
          <FundoCard filtro={filtro} titulo={"MAIS PROCURADOS"} i={procurados} itens={itens} />
        </div>

        <div id="searchs">
          <FundoCard filtro={filtro} titulo={"PRODUTOS"} i={produto} itens={itens}/>
        </div>
      </div>

    </div>
  );
}

export default App;

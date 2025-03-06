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

const itens = [
  {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camiseta The Bleatles"},
  {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"},
  {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"},
  {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"},
  {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"},
  {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"},
  {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"},
  {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"}
];

const itens2 = [
{categoria: "Intrumentos", imagem: guitarra, preco: "1390,00", nome: "Guitarra"},
  {categoria: "Intrumentos", imagem: guitarra, preco: "1390,00", nome: "Guitarra"},
  {categoria: "Intrumentos", imagem: guitarra, preco: "170,00", nome: "Guitarra"},
  {categoria: "Intrumentos", imagem: guitarra, preco: "1450,00", nome: "Guitarra"},
  {categoria: "Intrumentos", imagem: guitarra, preco: "1230,00", nome: "Guitarra"},
  {categoria: "Intrumentos", imagem: guitarra, preco: "1206,00", nome: "Guitara"},
  {categoria: "Intrumentos", imagem: guitarra, preco: "17,00", nome: "Guitarraaa"},
  {categoria: "Intrumentos", imagem: guitarra, preco: "130,00", nome: "guitarra"}
];

const itens3 = [{categoria: "Intrumentos", imagem: guitarra, preco: "1230,00", nome: "Guitarra"},
{categoria: "Intrumentos", imagem: guitarra, preco: "1206,00", nome: "Guitara"},
{categoria: "Intrumentos", imagem: guitarra, preco: "17,00", nome: "Guitarraaa"},
{categoria: "Intrumentos", imagem: guitarra, preco: "130,00", nome: "guitarra"},
  {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"},
  {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"},
  {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"},
  {categoria: "Vestimentas", imagem: camisa, preco: "120,00", nome: "Camisa The Bleatles"}]

function App() {
  const [filtro, setFiltro] = useState("");

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
          <FundoCard filtro={filtro} titulo={"MAIS PROCURADOS"} i={procurados} itens={itens2} />
        </div>

        <div id="searchs">
          <FundoCard filtro={filtro} titulo={"PRODUTOS"} i={produto} itens={itens3}/>
        </div>
      </div>

    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Produto from './Produto';
import Carrinho from './Carrinho';
import Login from './Login';
import User from './CadastrarUser'
import CarrinhoPagar from './CarrinhoPagar'
import Esqueci from "./EsqueciSenha"
import Admin from "./pages/Admin/Admin"
import Usuarios from "./pages/usuarios/Usuarios"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/produto/:nome/:id" element={<Produto />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<User />} />
      <Route path="/:id/:number" element={<CarrinhoPagar></CarrinhoPagar>}/>
      <Route path="/Esqueci" element={<Esqueci></Esqueci>}/>
      <Route path='/admin' element={<Admin></Admin>}></Route>
      <Route path='/admin/usuarios' element={<Usuarios></Usuarios>}></Route>


      
    </Routes>
  </Router>
);

reportWebVitals();

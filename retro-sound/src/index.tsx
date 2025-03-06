import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Produto from './Produto';
import Carrinho from './Carrinho';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/produto/:nome/:id" element={<Produto />} />
      <Route path="/carrinho" element={<Carrinho />} />
    </Routes>
  </Router>
);

reportWebVitals();

import React from 'react';
import './App.css';
import Table from './components/tabela/Table';
import FiltroNome from './components/filtros/FiltroNome';
import FiltosNumericos from './components/filtros/FiltosNumericos';
import FiltroOrdenacao from './components/filtros/FiltroOrdenacao';
import ApiProvider from './context/ApiProvider';

function App() {
  return (
    <ApiProvider>
      <div>
        <FiltroNome />
        <FiltosNumericos />
        <FiltroOrdenacao />
        <Table />
      </div>
    </ApiProvider>
  );
}

export default App;

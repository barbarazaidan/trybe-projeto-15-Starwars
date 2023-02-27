import React from 'react';
import './App.css';
import Table from './components/Table';
import ApiProvider from './context/ApiProvider';

function App() {
  return (
    <ApiProvider>
      <div>
        <Table />
      </div>
    </ApiProvider>
  );
}

export default App;

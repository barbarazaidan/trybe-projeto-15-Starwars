import React, { useState, useEffect, useContext } from 'react';
import ApiContext from '../../context/ApiContext';

function TableHeader() {
  const [chaves, setChaves] = useState([]);
  const contextInfo = useContext(ApiContext); // pego os dados da API que estão salvos no "estado global"
  // console.log(contextInfo);
  const { planetasApi } = contextInfo;
  // console.log(planetasApi);

  useEffect(() => {
    const chavesDaAPI = Object.keys(planetasApi[0]);
    setChaves(chavesDaAPI);
  }, [planetasApi]);

  return (
    <tr>
      {chaves.map((chave) => (
        <th key={ chave }>{chave}</th>
      ))}
    </tr>
  );
}

export default TableHeader;

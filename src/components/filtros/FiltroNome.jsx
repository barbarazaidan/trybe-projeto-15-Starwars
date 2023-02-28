import React, { useContext, useEffect, useState } from 'react';
import ApiContext from '../../context/ApiContext';
import TableBody from '../tabela/TableBody';
// import useFiltroPlanetas from '../../hooks/useFiltroPlanetas';

function FiltroNome() {
  const planetasAPI = useContext(ApiContext); // pego os dados da API que estão salvos no "estado global"
  const [value, setValue] = useState('');
  // const [planetas, setPlanetas] = useState([]);
  const [planetasFiltrados, setPlanetasFiltrados] = useState([]);

  function filtraPlanetas(valor) {
    return planetasAPI.filter((planeta) => planeta.name.toLowerCase().includes(valor));
  }

  function handleChange({ target }) {
    setValue(target.value.toLowerCase());
    if (planetasAPI.length > 0) {
      // setPlanetas(planetasAPI);
      const filtrados = filtraPlanetas(value);
      console.log(planetasFiltrados);
      setPlanetasFiltrados(filtrados);
    }
  }

  return (
    <label htmlFor="filtroNome">
      <input
        id="filtroNome"
        type="text"
        value={ value }
        placeholder="Filtrar por nome"
        onChange={ handleChange }
      />
    </label>
  );
}

export default FiltroNome;

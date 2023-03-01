import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';

// function ApiProvider(props) {
//   const { children } = props;
function ApiProvider({ children }) {
  const [planetasApi, setPlanetasApi] = useState([]);
  const [planetasFiltradosNome, setPlanetasFiltradosNome] = useState([]);
  const [valueName, setValueName] = useState('');

  useEffect(() => {
    const URL = 'https://swapi.dev/api/planets';
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.results); // retorna um array de objetos
        const apiSemResidents = data.results.map((result) => {
          delete result.residents;
          return result;
        });
        // console.log(apiSemResidents);
        setPlanetasApi(apiSemResidents);
        // console.log('estado logo depois do fetch', planetasApi);
      });
  }, []);

  // console.log('estado depois do fetch', planetasApi);

  // função que efetivamente executa o filtro dos planetas por nome
  const filtraPlanetas = useCallback((valor) => planetasApi
    .filter((planeta) => planeta.name.toLowerCase()
      .includes(valor)), [planetasApi]);

  // useEffect para fazer com que o filtro só ocorra depois que o valueName esteja com o valor atualizado, do contrário, escrevo e só depois ele pega o filtro do que escrevi
  useEffect(() => {
    const filtrados = filtraPlanetas(valueName);
    console.log('filtrados', filtrados);
    console.log('valor', valueName);
    setPlanetasFiltradosNome(filtrados);
  }, [valueName, filtraPlanetas]);

  // função para pegar o valor do que é digitado no componente FiltroNome
  const handleChange = useCallback((event) => {
    // console.log(event.target.value);
    setValueName(event.target.value.toLowerCase());
  }, []);

  return (
    <ApiContext.Provider
      value={ {
        planetasApi,
        handleChange,
        planetasFiltradosNome,
      } }
    >
      {children}
    </ApiContext.Provider>
  );
}

ApiProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ApiProvider;

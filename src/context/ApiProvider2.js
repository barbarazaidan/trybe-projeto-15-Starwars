import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';

// function ApiProvider(props) {
//   const { children } = props;
function ApiProvider({ children }) {
  const [planetasApi, setPlanetasApi] = useState([]);
  const [planetasFiltrados, setPlanetasFiltradosNome] = useState([]);
  const [value, setValue] = useState('');

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
      });
  }, []);

  const filtraPlanetas = useCallback((valor) => planetasApi
    .filter((planeta) => planeta.name.toLowerCase()
      .includes(valor)), [planetasApi]);

  const handleChange = useCallback((event) => {
    setValue(event.target.value.toLowerCase());
    if (planetasApi.length > 0) {
      const filtrados = filtraPlanetas(value);
      console.log(filtrados);
      setPlanetasFiltradosNome(filtrados);
    }
  }, [filtraPlanetas, value, planetasApi]);

  // useEffect(() => {
  //   const URL = 'https://swapi.dev/api/planets';
  //   const fetchData = async () => {
  //     const response = await fetch(URL);
  //     const data = await response.json();
  //     // console.log(data.results); // retorna um array de objetos
  //     const apiSemResidents = data.results.map((result) => {
  //       delete result.residents;
  //       return result;
  //     });
  //     console.log(apiSemResidents);
  //     setPlanetasApi(apiSemResidents);
  //     console.log(planetasApi);
  //   };
  //   fetchData();
  // }, [planetasApi]);

  // const filtraPlanetas = (valor) => planetasApi
  //   .filter((planeta) => planeta.name.toLowerCase()
  //     .includes(valor));

  // const handleChange = (event) => {
  //   setValue(event.target.value.toLowerCase());
  //   if (planetasApi.length > 0) {
  //     const filtrados = filtraPlanetas(value);
  //     console.log(filtrados);
  //     setPlanetasFiltradosNome(filtrados);
  //   }
  // };

  console.log(planetasApi);

  return (
    <ApiContext.Provider
      value={ {
        planetas: planetasApi,
        handleChange,
        planetasFiltrados,
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

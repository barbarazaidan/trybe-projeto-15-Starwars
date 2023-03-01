import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';

// function ApiProvider(props) {
//   const { children } = props;
function ApiProvider({ children }) {
  const [planetasApi, setPlanetasApi] = useState([]);
  const [nomeInput, setNomeInput] = useState([]);
  const [planetasFiltrados, setPlanetasFiltrados] = useState([]);
  const [filtrosSelecionados, setfiltrosSelecionados] = useState({
    coluna: 'population',
    operador: 'maior que',
    numero: 0,
  });

  // --------------------------------------------------------------------------------------------------
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

  //  função que efetivamente executa o filtro dos planetas por nome
  const filtraPlanetasNome = useCallback(
    (nome) => planetasApi.filter((planeta) => planeta.name.toLowerCase().includes(nome)),
    [planetasApi],
  );

  // --------------------------------------------------------------------------------------------------
  // useEffect para fazer com que o filtro do nome só ocorra depois que o nomeInput esteja com o valor atualizado, do contrário, escrevo e só depois ele pega o filtro do que escrevi
  useEffect(() => {
    const filtradosNome = filtraPlanetasNome(nomeInput);
    console.log('filtradosNome', filtradosNome);
    setPlanetasFiltrados(filtradosNome);
  }, [nomeInput, filtraPlanetasNome]);

  const handleChangeName = useCallback((event) => {
    setNomeInput(event.target.value);
  }, []);

  // --------------------------------------------------------------------------------------------------
  // função para avaliar quais os filtros numéricos utilizados e atualizar o estado PlanetasFiltrados
  const clickBotaoFiltrar = useCallback(() => {
    const { coluna, operador, numero } = filtrosSelecionados;
    let filtroColuna = [];
    // console.log('coluna', coluna);
    // console.log(filtrosSelecionados);

    switch (operador) {
    case 'maior que':
      filtroColuna = planetasFiltrados.filter((planeta) => {
        console.log(planeta);
        console.log(planeta[coluna]);
        return planeta[coluna] !== 'unknown' && Number(planeta[coluna]) > Number(numero);
      });
      console.log(filtroColuna, 'filtroColuna>');
      setPlanetasFiltrados(filtroColuna);
      break;
    case 'menor que':
      filtroColuna = planetasFiltrados.filter((planeta) => (
        planeta[coluna] !== 'unknown' && Number(planeta[coluna]) < Number(numero)
      ));
      console.log(filtroColuna, 'filtroColuna<');
      setPlanetasFiltrados(filtroColuna);
      break;
    case 'igual a':
      filtroColuna = planetasFiltrados.filter((planeta) => (
        planeta[coluna] !== 'unknown' && Number(planeta[coluna]) === Number(numero)
      ));
      console.log(filtroColuna, 'filtroColuna=');
      console.log(planetasFiltrados);
      setPlanetasFiltrados(filtroColuna);
      break;
    default:
      return planetasFiltrados;
    }
  }, [filtrosSelecionados, planetasFiltrados]);

  // --------------------------------------------------------------------------------------------------
  // função genérica para pegar o valor do que é digitado no componente FiltroNome e escolhido no componente FiltrosNumericos
  const handleChangeSelects = useCallback((event) => {
    const nome = event.target.name;
    console.log(event.target.value);
    setfiltrosSelecionados({
      ...filtrosSelecionados,
      [nome]: event.target.value,
    });
  }, [filtrosSelecionados]);

  return (
    <ApiContext.Provider
      value={ {
        planetasApi,
        handleChangeName,
        planetasFiltrados,
        handleChangeSelects,
        clickBotaoFiltrar,
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

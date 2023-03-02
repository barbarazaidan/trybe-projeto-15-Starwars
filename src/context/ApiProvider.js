import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';

// function ApiProvider(props) {
//   const { children } = props;
function ApiProvider({ children }) {
  const [planetasApi, setPlanetasApi] = useState([]); // planetas chamados da API sem a chave Residents
  const [nomeInput, setNomeInput] = useState([]); // valor digitado no input name
  const [planetasFiltrados, setPlanetasFiltrados] = useState([]); // resultado dos planetas filtrados
  const [filtroColunas, setFiltroColunas] = useState([ // filtros disponíveis no select da coluna
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [filtrosSelecionados, setfiltrosSelecionados] = useState({ // filtros do select
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
    // console.log('filtradosNome', filtradosNome);
    setPlanetasFiltrados(filtradosNome);
  }, [nomeInput, filtraPlanetasNome]);

  const handleChangeName = useCallback((event) => {
    setNomeInput(event.target.value);
  }, []);

  // --------------------------------------------------------------------------------------------------
  // funções para remover os filtros já utilizados do array e atualizar o valor inicial do estado para o próximo item da coluna
  useEffect(() => {
    setfiltrosSelecionados({
      coluna: filtroColunas[0],
      operador: 'maior que',
      numero: 0,
    });
  }, [filtroColunas]); // se faço o spred dos filtrosSelecionados, aparece um warning no array de dependências informando que preciso colocar filtrosSelecionados dentro do array, mas quando faço isso o programa entra em loop infinito. Posso ignorar o warning ou destrinchar as chaves do filtrosSelecionados. Assim tudo funciona como eu quero, atualizando o objeto apenas depois que filtroColunas muda de tamanho, que ocorre na função abaixo.

  const removeFiltrosColuna = useCallback((coluna) => {
    const filtrosAtualizados = filtroColunas.filter((filtro) => filtro !== coluna);
    setFiltroColunas(filtrosAtualizados);
  }, [filtroColunas]);

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
    removeFiltrosColuna(coluna);
  }, [filtrosSelecionados, planetasFiltrados, removeFiltrosColuna]);

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
        filtroColunas,
        filtrosSelecionados,
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

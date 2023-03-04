import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';

// function ApiProvider(props) {
//   const { children } = props;
function ApiProvider({ children }) {
  const [planetasApi, setPlanetasApi] = useState([]); // planetas chamados da API sem a chave Residents
  const [nomeInput, setNomeInput] = useState([]); // valor digitado no input name
  const [planetasFiltradosNome, setPlanetasFiltradosNome] = useState([]); // resultado dos planetas filtrados pelo
  const [planetasFiltradosGeral, setPlanetasFiltradosGeral] = useState([]); // resultado dos planetas filtrados
  const [filtroColunas, setFiltroColunas] = useState([ // filtros disponíveis no select da coluna
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [filtrosAtuais, setfiltrosAtuais] = useState({ // filtros do select
    coluna: 'population',
    operador: 'maior que',
    numero: 0,
  });
  const [arrayFiltrosSelecionados, setArrayFiltrosSelecionados] = useState([]);

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

  // --------------------------------------------------------------------------------------------------
  // FUNÇÕES HANDLE CHANGE
  const handleChangeName = useCallback((event) => {
    setNomeInput(event.target.value);
  }, []);

  // função genérica para pegar o valor do que é digitado no componente FiltroNome e escolhido no componente FiltrosNumericos
  const handleChangeSelects = useCallback((event) => {
    const nome = event.target.name;
    console.log(event.target.value);
    setfiltrosAtuais({
      ...filtrosAtuais,
      [nome]: event.target.value,
    });
  }, [filtrosAtuais]);

  // --------------------------------------------------------------------------------------------------
  // FUNÇÕES PARA LIDAR COM O FILTRO POR NOME

  // função que efetivamente executa o filtro dos planetas por nome
  const filtraPlanetasNome = useCallback(
    (nome) => planetasApi.filter((planeta) => planeta.name.toLowerCase().includes(nome)),
    [planetasApi],
  );

  // useEffect para fazer com que o filtro do nome só ocorra depois que o nomeInput esteja com o valor atualizado, do contrário, escrevo e só depois ele pega o filtro do que escrevi
  useEffect(() => {
    const filtradosNome = filtraPlanetasNome(nomeInput);
    // console.log('filtradosNome', filtradosNome);
    setPlanetasFiltradosNome(filtradosNome);
    setPlanetasFiltradosGeral(filtradosNome);
  }, [nomeInput, filtraPlanetasNome]);

  // --------------------------------------------------------------------------------------------------
  // FUNÇÕES PARA LIDAR COM O CLICK DO BOTÃO DE FILTRAR

  // funções para remover os filtros já utilizados do array e atualizar o valor inicial do estado para o próximo item da coluna
  useEffect(() => {
    setfiltrosAtuais({
      coluna: filtroColunas[0],
      operador: 'maior que',
      numero: 0,
    });
  }, [filtroColunas]); // se faço o spred dos filtrosAtuais, aparece um warning no array de dependências informando que preciso colocar filtrosAtuais dentro do array, mas quando faço isso o programa entra em loop infinito. Posso ignorar o warning ou destrinchar as chaves do filtrosAtuais. Assim tudo funciona como eu quero, atualizando o objeto apenas depois que filtroColunas muda de tamanho, que ocorre na função abaixo.

  // função que remove o filtro do dropdow
  const removeFiltrosColuna = useCallback((coluna) => {
    const filtrosAtualizados = filtroColunas.filter((filtro) => filtro !== coluna);
    setFiltroColunas(filtrosAtualizados);
  }, [filtroColunas]);

  const geraArrayFiltrosSelecionados = (filtros) => {
    console.log(arrayFiltrosSelecionados);
    console.log(filtros);
    setArrayFiltrosSelecionados([...arrayFiltrosSelecionados, filtros]);
  };

  // função que efetivamente faz o filtro
  const swicthParaFazerOFiltro = useCallback((coluna, operador, numero) => {
    let filtroPlanetasPorColuna = [];
    console.log(planetasFiltradosGeral);

    switch (operador) {
    case 'maior que':
      filtroPlanetasPorColuna = planetasFiltradosGeral.filter((planeta) => (
        // console.log(planeta);
        // console.log(planeta[coluna]);
        planeta[coluna] !== 'unknown' && Number(planeta[coluna]) > Number(numero)
      ));
      // console.log(filtroPlanetasPorColuna, 'filtroPlanetasPorColuna>');
      break;
    case 'menor que':
      filtroPlanetasPorColuna = planetasFiltradosGeral.filter((planeta) => (
        planeta[coluna] !== 'unknown' && Number(planeta[coluna]) < Number(numero)
      ));
      // console.log(filtroPlanetasPorColuna, 'filtroPlanetasPorColuna<');
      break;
    case 'igual a':
      filtroPlanetasPorColuna = planetasFiltradosGeral.filter((planeta) => (
        planeta[coluna] !== 'unknown' && Number(planeta[coluna]) === Number(numero)
      ));
      // console.log(filtroPlanetasPorColuna, 'filtroPlanetasPorColuna=');
      break;
    default:
      filtroPlanetasPorColuna = planetasFiltradosNome;
    }
    console.log(filtroPlanetasPorColuna);
    setPlanetasFiltradosGeral(filtroPlanetasPorColuna);
    // console.log(planetasFiltradosGeral);
  }, [planetasFiltradosGeral, planetasFiltradosNome]);

  // função do click
  const clickBotaoFiltrar = () => {
    const { coluna, operador, numero } = filtrosAtuais;
    geraArrayFiltrosSelecionados(filtrosAtuais);
    swicthParaFazerOFiltro(coluna, operador, numero);
    removeFiltrosColuna(coluna);
  };

  // FUNÇÕES PARA LIDAR COM A EXLUSÃO DOS FILTROS

  useEffect(() => {
    if (arrayFiltrosSelecionados.length !== 0) {
      arrayFiltrosSelecionados.forEach((elemento) => {
        const { coluna, operador, numero } = elemento;
        swicthParaFazerOFiltro(coluna, operador, numero);
      });
    }
  }, [arrayFiltrosSelecionados]);

  // função que coloca o nome da coluna de volta no dropdown
  const devolveFiltroAoDropdown = useCallback((coluna) => {
    const estadosIniciaisDropdown = [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ];

    const colunasAtuais = [...filtroColunas, coluna];
    // console.log(colunasAtuais);

    // o filter no estadosIniciaisDropdown vai manter a ordem inicial das colunas e o some retorna true ou false para cada cada elemento. Ou seja, verifico se, por exemplo, 'population' tem no colunasAtuais; em caso positivo, ele entra no array novo estadoAtualizadoDropdown já na ordem certinha.
    const estadoAtualizadoDropdown = estadosIniciaisDropdown
      .filter((estadoInicial) => colunasAtuais
        .some((colunaAtual) => colunaAtual === estadoInicial));

    // console.log(estadoAtualizadoDropdown);
    setFiltroColunas(estadoAtualizadoDropdown); // ao atualizar o filtroColunas, o programa atualiza automaticamente o filtrosAtuais, que está no useEffect
  }, [filtroColunas]);

  const removeArrayFiltrosSelecionados = (filtros) => {
    const arrayAtualizado = arrayFiltrosSelecionados.filter((elemento) => (
      elemento.coluna !== filtros.coluna
    ));
    // console.log(arrayAtualizado);
    setArrayFiltrosSelecionados(arrayAtualizado);
    setPlanetasFiltradosGeral(planetasFiltradosNome);
    // renderizaNovamenteTabelaDepoisDeApagarFiltro(arrayAtualizado); // passei o arrayAtualizado para evitar a assincronicidade do estado
    devolveFiltroAoDropdown(filtros.coluna);
  };

  useEffect(() => {});

  const clickExcluirFiltro = (elementos) => {
    // console.log(elementos);
    removeArrayFiltrosSelecionados(elementos);
  };

  // --------------------------------------------------------------------------------------------------

  return (
    <ApiContext.Provider
      value={ {
        planetasApi,
        handleChangeName,
        planetasFiltradosGeral,
        handleChangeSelects,
        clickBotaoFiltrar,
        clickExcluirFiltro,
        filtroColunas,
        filtrosAtuais,
        arrayFiltrosSelecionados,
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

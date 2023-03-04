import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';

// function ApiProvider(props) {
//   const { children } = props;
function ApiProvider({ children }) {
  const [planetasApi, setPlanetasApi] = useState([]); // planetas chamados da API sem a chave Residents
  const [nomeInput, setNomeInput] = useState([]); // valor digitado no input name
  const [planetasFiltradosNome, setPlanetasFiltradosNome] = useState([]); // resultado dos planetas filtrados pelo nome
  const [planetasFiltradosDropdownNome, setPlanetasFiltradosDropdownNome] = useState([]); // resultado dos planetas filtrados pelo dropdown e pelo nome
  const [filtroGeralDosPlanetas, setFiltroGeralDosPlanetas] = useState([]); // estado cujo resultado é igual ao dos planetasFiltradosDropdownNome, mas necessário para o processo de manipulação sem loops inifinitos, pois ele fica isolado
  const [filtroColunasDoDropdown, setFiltroColunasDoDropdown] = useState([ // filtros disponíveis no select da coluna
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [filtrosAtuais, setfiltrosAtuais] = useState({ // filtros do select
    coluna: 'population',
    operador: 'maior que',
    numero: 0,
  });
  const [arrayFiltrosSelecionados, setArrayFiltrosSelecionados] = useState([]); // array de objetos com todos os filtros já selecionados pelo usuário

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
      });
  }, []);

  // --------------------------------------------------------------------------------------------------
  // FUNÇÕES HANDLE CHANGE
  // função genérica para pegar o valor do que é digitado no componente FiltroNome
  const handleChangeName = useCallback((event) => {
    setNomeInput(event.target.value);
  }, []);

  // função genérica para pegar o valor do que é escolhido no componente FiltrosNumericos
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

  // o useEffect aqui faz a função da callBack do this.setState. Ou seja, ele executa o filtradosNome sempre que o estado nomeInput for alterado. Isso ocorre de forma automática.
  useEffect(() => {
    const filtradosNome = planetasApi
      .filter((planeta) => planeta.name.toLowerCase().includes(nomeInput));
    // console.log('filtradosNome', filtradosNome);
    setPlanetasFiltradosNome(filtradosNome);
    setPlanetasFiltradosDropdownNome(filtradosNome);
  }, [nomeInput, planetasApi]);

  // --------------------------------------------------------------------------------------------------
  // FUNÇÕES PARA LIDAR COM O CLICK DO BOTÃO DE FILTRAR

  // o useEffect aqui faz a função da callBack do this.setState. Ou seja, toda vez que o filtroColunasDoDropdown for atualizado, ele vai atualizar automaticamente o valor dos filtrosAtuais
  useEffect(() => {
    setfiltrosAtuais({
      coluna: filtroColunasDoDropdown[0],
      operador: 'maior que',
      numero: 0,
    });
  }, [filtroColunasDoDropdown]); // se faço o spred dos filtrosAtuais, aparece um warning no array de dependências informando que preciso colocar filtrosAtuais dentro do array, mas quando faço isso o programa entra em loop infinito. Para resolver, precisei destrinchar as chaves do filtrosAtuais. Assim tudo funciona como eu quero, atualizando o objeto apenas depois que filtroColunasDoDropdown se modifica

  // função que remove o filtro usado do dropdown quando ocorre o click para fazer filtragem
  const removeFiltrosColunaDoDropdown = (coluna) => {
    const filtrosAtualizados = filtroColunasDoDropdown
      .filter((filtro) => filtro !== coluna);
    setFiltroColunasDoDropdown(filtrosAtualizados);
  };

  // a função swicthParaFazerOFiltro é que efetivamente faz o filtro. Ela retorna o array com os planetas filtrados e trabalha com o resultado salvo no planetasFiltradosDropdownNome
  // o swicthParaFazerOFiltro, além das chamadas explícitas, também roda automaticamente quando uando escrevo algo no input nome, pois isso afeta os estados planetasFiltradosNome e planetasFiltradosDropdownNome, que estão no array de dependências
  const swicthParaFazerOFiltro = useCallback((coluna, operador, numero) => {
    let filtroPlanetasPorColuna = [];
    console.log(planetasFiltradosDropdownNome, 'planetasFiltradosDropdownNome');

    switch (operador) {
    case 'maior que':
      filtroPlanetasPorColuna = planetasFiltradosDropdownNome.filter((planeta) => (
        // console.log(planeta);
        // console.log(planeta[coluna]);
        planeta[coluna] !== 'unknown' && Number(planeta[coluna]) > Number(numero)
      ));
      // console.log(filtroPlanetasPorColuna, 'filtroPlanetasPorColuna>');
      break;
    case 'menor que':
      filtroPlanetasPorColuna = planetasFiltradosDropdownNome.filter((planeta) => (
        planeta[coluna] !== 'unknown' && Number(planeta[coluna]) < Number(numero)
      ));
      // console.log(filtroPlanetasPorColuna, 'filtroPlanetasPorColuna<');
      break;
    case 'igual a':
      filtroPlanetasPorColuna = planetasFiltradosDropdownNome.filter((planeta) => (
        planeta[coluna] !== 'unknown' && Number(planeta[coluna]) === Number(numero)
      ));
      // console.log(filtroPlanetasPorColuna, 'filtroPlanetasPorColuna=');
      break;
    default:
      filtroPlanetasPorColuna = planetasFiltradosNome;
    }
    // console.log(filtroPlanetasPorColuna, 'retorno do switch');
    return filtroPlanetasPorColuna;
  }, [planetasFiltradosDropdownNome, planetasFiltradosNome]);

  // função do click ao selecionar o filtro
  const clickBotaoFiltrar = () => {
    const { coluna, operador, numero } = filtrosAtuais;
    // atualiza o array com os novos objetos referentes a cada filtro selecionado
    setArrayFiltrosSelecionados([...arrayFiltrosSelecionados, filtrosAtuais]);
    // chama o switch e salva o array retornado
    const filtroPorColuna = swicthParaFazerOFiltro(coluna, operador, numero);
    // console.log(filtroPorColuna);
    // atualizo o estado com o valor retornado pelo switch
    setPlanetasFiltradosDropdownNome(filtroPorColuna);
    removeFiltrosColunaDoDropdown(coluna);
  };

  // --------------------------------------------------------------------------------------------------
  // FUNÇÕES PARA LIDAR COM A EXLUSÃO DOS FILTROS

  // aqui está a função para renderizar novamente a tabela depois de excluir os filtros individuais. Ela, entretanto, é chamada várias vezes (quando mudam os estados arrayFiltrosSelecionados e planetasFiltradosNome e quando a função swicthParaFazerOFiltro ocorre - que é sempre que o planetasFiltradosDropdownNome muda. Em resumo, ela é a gestora das demais funções.
  // este useEffec vai verificar o tamanho do arrayFiltrosSelecionados, fazer um map switch (caso precise) e atualizar o estado FiltroGeralDosPlanetas
  useEffect(() => {
    let testando = [];
    console.log(arrayFiltrosSelecionados, 'arrayFiltrosSelecionados do excluir');
    if (arrayFiltrosSelecionados.length !== 0) {
      arrayFiltrosSelecionados.forEach((elemento) => {
        const { coluna, operador, numero } = elemento;
        testando = swicthParaFazerOFiltro(coluna, operador, numero);
        console.log(testando, 'linha 151');
      });
      setFiltroGeralDosPlanetas(testando);
    } else {
      setFiltroGeralDosPlanetas(planetasFiltradosNome);
    }
  }, [arrayFiltrosSelecionados, planetasFiltradosNome, swicthParaFazerOFiltro]);

  // função que coloca o nome da coluna de volta no dropdown
  const devolveFiltroAoDropdown = useCallback((coluna) => {
    const estadosIniciaisDropdown = [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ];

    const colunasAtuais = [...filtroColunasDoDropdown, coluna];
    // console.log(colunasAtuais);

    // o filter no estadosIniciaisDropdown vai manter a ordem inicial das colunas e o some retorna true ou false para cada cada elemento. Ou seja, verifico se, por exemplo, 'population' tem no colunasAtuais; em caso positivo, ele entra no array novo estadoAtualizadoDropdown já na ordem certinha.
    const estadoAtualizadoDropdown = estadosIniciaisDropdown
      .filter((estadoInicial) => colunasAtuais
        .some((colunaAtual) => colunaAtual === estadoInicial));

    // console.log(estadoAtualizadoDropdown);
    setFiltroColunasDoDropdown(estadoAtualizadoDropdown); // ao atualizar o filtroColunasDoDropdown, o programa atualiza automaticamente o filtrosAtuais, que está no useEffect
  }, [filtroColunasDoDropdown]);

  const removeArrayFiltrosSelecionados = (filtros) => {
    const arrayAtualizado = arrayFiltrosSelecionados.filter((elemento) => (
      elemento.coluna !== filtros.coluna
    ));
    // console.log(arrayAtualizado);
    setArrayFiltrosSelecionados(arrayAtualizado);
    devolveFiltroAoDropdown(filtros.coluna);
  };

  useEffect(() => {});

  const clickExcluirFiltro = (elementos) => {
    // console.log(elementos);
    removeArrayFiltrosSelecionados(elementos);
    setPlanetasFiltradosDropdownNome(planetasFiltradosNome); // o objetivo aqui é 'zerar' os planetas mantendo apenas os filtros do nome para aí refazer os filtros numéricos
  };

  const clickExcluirTodosFiltros = () => {
    setFiltroColunasDoDropdown([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ]);
    setArrayFiltrosSelecionados([]);
  };

  // --------------------------------------------------------------------------------------------------

  return (
    <ApiContext.Provider
      value={ {
        planetasApi,
        handleChangeName,
        handleChangeSelects,
        clickBotaoFiltrar,
        clickExcluirFiltro,
        clickExcluirTodosFiltros,
        filtroColunasDoDropdown,
        filtrosAtuais,
        arrayFiltrosSelecionados,
        filtroGeralDosPlanetas,
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

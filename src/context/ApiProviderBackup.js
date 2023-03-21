// import React, { useState, useEffect, useCallback } from 'react';
// import PropTypes from 'prop-types';
// import ApiContext from './ApiContext';

// // function ApiProvider(props) {
// //   const { children } = props;
// function ApiProvider({ children }) {
//   const [planetasApi, setPlanetasApi] = useState([]); // planetas chamados da API sem a chave Residents
//   const [nomeInput, setNomeInput] = useState([]); // valor digitado no input name
//   const [planetasFiltradosNome, setPlanetasFiltradosNome] = useState([]); // resultado dos planetas filtrados pelo nome
//   const [filtroGeralDosPlanetas, setFiltroGeralDosPlanetas] = useState([]); // resultado dos filtros do nome e dos selects
//   const [filtroColunasDoDropdown, setFiltroColunasDoDropdown] = useState([ // filtros disponíveis no select da coluna
//     'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
//   ]);
//   const [filtrosAtuais, setfiltrosAtuais] = useState({ // filtros do select
//     coluna: 'population',
//     operador: 'maior que',
//     numero: 0,
//   });
//   const [arrayFiltrosSelecionados, setArrayFiltrosSelecionados] = useState([]); // array de objetos com todos os filtros já selecionados pelo usuário

//   console.log('filtroGeralDosPlanetas', filtroGeralDosPlanetas);

//   // --------------------------------------------------------------------------------------------------
//   useEffect(() => {
//     const URL = 'https://swapi.dev/api/planets';
//     fetch(URL)
//       .then((response) => response.json())
//       .then((data) => {
//         // console.log(data);
//         const apiSemResidents = data.results.map((result) => {
//           delete result.residents;
//           return result;
//         });
//         // console.log(apiSemResidents);
//         setPlanetasApi(apiSemResidents);
//       });
//   }, []);

//   // --------------------------------------------------------------------------------------------------
//   // FUNÇÕES HANDLE CHANGE
//   // função genérica para pegar o valor do que é digitado no componente FiltroNome
//   const handleChangeName = useCallback((event) => {
//     setNomeInput(event.target.value);
//   }, []);

//   // função genérica para pegar o valor do que é escolhido no componente FiltrosNumericos
//   const handleChangeSelects = useCallback((event) => {
//     const nome = event.target.name;
//     // console.log(event.target.value);
//     setfiltrosAtuais({
//       ...filtrosAtuais,
//       [nome]: event.target.value,
//     });
//   }, [filtrosAtuais]);

//   // --------------------------------------------------------------------------------------------------
//   // FUNÇÕES PARA LIDAR COM O FILTRO POR NOME

//   // o useEffect aqui faz a função da callBack do this.setState. Ou seja, ele executa o filtradosNome sempre que o estado nomeInput for alterado. Isso ocorre de forma automática.
//   useEffect(() => {
//     const filtradosNome = planetasApi
//       .filter((planeta) => planeta.name.toLowerCase().includes(nomeInput));
//     // console.log('filtradosNome', filtradosNome);
//     setPlanetasFiltradosNome(filtradosNome);
//   }, [nomeInput, planetasApi]);

//   // --------------------------------------------------------------------------------------------------
//   // FUNÇÕES PARA LIDAR COM O CLICK DO BOTÃO DE FILTRAR

//   // o useEffect aqui faz a função da callBack do this.setState. Ou seja, toda vez que o filtroColunasDoDropdown for atualizado, ele vai atualizar automaticamente o valor dos filtrosAtuais
//   useEffect(() => {
//     setfiltrosAtuais({
//       coluna: filtroColunasDoDropdown[0],
//       operador: 'maior que',
//       numero: 0,
//     });
//   }, [filtroColunasDoDropdown]); // se faço o spred dos filtrosAtuais, aparece um warning no array de dependências informando que preciso colocar filtrosAtuais dentro do array, mas quando faço isso o programa entra em loop infinito. Para resolver, precisei destrinchar as chaves do filtrosAtuais. Assim tudo funciona como eu quero, atualizando o objeto apenas depois que filtroColunasDoDropdown se modifica

//   // função que remove o filtro usado do dropdown quando ocorre o click para fazer filtragem
//   const removeFiltrosColunaDoDropdown = (coluna) => {
//     const filtrosAtualizados = filtroColunasDoDropdown
//       .filter((filtro) => filtro !== coluna);
//     setFiltroColunasDoDropdown(filtrosAtualizados);
//   };

//   // a função swicthParaFazerOFiltro é que efetivamente faz o filtro. Ela é chamada sempre que ArrayFiltrosSelecionados muda de valor, ou seja, na chamada do clickBotaoFiltrar e do clickExcluirFiltro e também no início do carregamento.

//   // aqui analiso cada linha da tabela. A cada uma delas, faço um forEach para iterar sobre o arrayFiltrosSelecionados e retorno um true ou false se a comparação for correta. Com o array de true e false finalizado, faço um every fora do forEach para verificar se todas as respostas são true.
//   const swicthParaFazerOFiltro = useCallback((linha) => {
//     // console.log('arrayFiltrosSelecionados', arrayFiltrosSelecionados);
//     // console.log('linha:', linha);
//     const contemplaOFiltro = [];
//     arrayFiltrosSelecionados.forEach(({ coluna, operador, numero }) => {
//       // console.log('entrei no foreach');
//       switch (operador) {
//       case 'maior que': {
//         const resultado = (
//           linha[coluna] !== 'unknown' && Number(linha[coluna]) > Number(numero)
//         );
//         // console.log(resultado);
//         contemplaOFiltro.push(resultado);
//       }
//         break;
//       case 'menor que': {
//         const resultado = (
//           linha[coluna] !== 'unknown' && Number(linha[coluna]) < Number(numero)
//         );
//         // console.log(resultado);
//         contemplaOFiltro.push(resultado);
//       }
//         break;
//       case 'igual a': {
//         const resultado = (
//           linha[coluna] !== 'unknown' && Number(linha[coluna]) === Number(numero)
//         );
//           // console.log(resultado);
//         contemplaOFiltro.push(resultado);
//       }
//         break;
//       default: {
//         const resultado = true;
//         contemplaOFiltro.push(resultado);
//       }
//       } // termina o switch
//     }); // termina o forEach

//     // console.log('contemplaOFiltro:', contemplaOFiltro);
//     const resultadoFinal = contemplaOFiltro.every((valor) => {
//       console.log('valor:', valor);
//       return valor; // o every sempre retorna true caso feito em um array vazio
//     });
//     // console.log('não entrei no foreach');
//     // console.log('resultadoFinal:', resultadoFinal);
//     return resultadoFinal;
//   }, [arrayFiltrosSelecionados]);

//   // depois que click nos botões, este useEffect ocorre e a função do swicthParaFazerOFiltro é executada; na sequência sai o resultado do filtrados e seto o valor do estado filtroGeralDosPlanetas
//   useEffect(() => {
//     // console.log('estou no useEffect depois do switch:');
//     const filtrados = planetasFiltradosNome.filter(swicthParaFazerOFiltro);
//     // console.log('filtrados:', filtrados);
//     setFiltroGeralDosPlanetas(filtrados);
//   }, [planetasFiltradosNome, swicthParaFazerOFiltro]);

//   // função do click ao selecionar o filtro
//   const clickBotaoFiltrar = () => {
//     const { coluna } = filtrosAtuais;
//     // atualiza o array com os novos objetos referentes a cada filtro selecionado
//     setArrayFiltrosSelecionados([...arrayFiltrosSelecionados, filtrosAtuais]);
//     removeFiltrosColunaDoDropdown(coluna);
//   };

//   // --------------------------------------------------------------------------------------------------
//   // FUNÇÕES PARA LIDAR COM A EXLUSÃO DOS FILTROS

//   // função que coloca o nome da coluna de volta no dropdown
//   const devolveFiltroAoDropdown = useCallback((coluna) => {
//     const estadosIniciaisDropdown = [
//       'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
//     ];
//     const colunasAtuais = [...filtroColunasDoDropdown, coluna];
//     // console.log(colunasAtuais);

//     // o filter no estadosIniciaisDropdown vai manter a ordem inicial das colunas e o some retorna true ou false para cada cada elemento. Ou seja, verifico se, por exemplo, 'population' tem no colunasAtuais; em caso positivo, ele entra no array novo estadoAtualizadoDropdown já na ordem certinha.
//     const estadoAtualizadoDropdown = estadosIniciaisDropdown
//       .filter((estadoInicial) => colunasAtuais
//         .some((colunaAtual) => colunaAtual === estadoInicial));
//     // console.log(estadoAtualizadoDropdown);

//     setFiltroColunasDoDropdown(estadoAtualizadoDropdown); // ao atualizar o filtroColunasDoDropdown, o programa atualiza automaticamente o filtrosAtuais, que está no useEffect
//   }, [filtroColunasDoDropdown]);

//   const removeArrayFiltrosSelecionados = (filtros) => {
//     const arrayAtualizado = arrayFiltrosSelecionados.filter((elemento) => (
//       elemento.coluna !== filtros.coluna
//     ));
//     // console.log(arrayAtualizado);
//     setArrayFiltrosSelecionados(arrayAtualizado);
//     devolveFiltroAoDropdown(filtros.coluna);
//   };

//   const clickExcluirFiltro = (elementos) => {
//     // console.log(elementos);
//     removeArrayFiltrosSelecionados(elementos);
//   };

//   const clickExcluirTodosFiltros = () => {
//     setFiltroColunasDoDropdown([
//       'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
//     ]);
//     setArrayFiltrosSelecionados([]);
//   };

//   // --------------------------------------------------------------------------------------------------

//   const funcaoParaOrdenar = (estadoSort) => {
//     const { column, sort } = estadoSort;
//     console.log('column', column);
//     console.log('sort', sort);
//     const planetasComSort = filtroGeralDosPlanetas.sort((a, b) => {
//       if (sort === 'ASC') {
//         return a[column] - b[column];
//       } return b[column] - a[column];
//     });
//     // console.log(planetasComSort);
//     setFiltroGeralDosPlanetas(planetasComSort);
//   };

//   console.log(filtroGeralDosPlanetas);

//   return (
//     <ApiContext.Provider
//       value={ {
//         planetasApi,
//         handleChangeName,
//         handleChangeSelects,
//         clickBotaoFiltrar,
//         clickExcluirFiltro,
//         clickExcluirTodosFiltros,
//         funcaoParaOrdenar,
//         filtroColunasDoDropdown,
//         filtrosAtuais,
//         arrayFiltrosSelecionados,
//         filtroGeralDosPlanetas,
//       } }
//     >
//       {children}
//     </ApiContext.Provider>
//   );
// }

// ApiProvider.propTypes = {
//   children: PropTypes.element.isRequired,
// };

// export default ApiProvider;

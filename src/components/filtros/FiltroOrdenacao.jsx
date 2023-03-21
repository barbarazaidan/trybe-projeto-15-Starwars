import React, { useContext, useState } from 'react';
import ApiContext from '../../context/ApiContext';

function FiltroOrdenacao() {
  const contextInfo = useContext(ApiContext);
  const { filtroGeralDosPlanetas, setFiltroGeralDosPlanetas } = contextInfo;
  const [estadoSort, setEstadoSort] = useState({
    column: 'population',
    sort: '',
  });

  const sortRadioESelect = (event) => {
    const { target: { value, id } } = event;
    console.log(value, id);
    if (id === 'selectSort') {
      setEstadoSort({
        ...estadoSort,
        column: value,
      });
    } else {
      setEstadoSort({
        ...estadoSort,
        sort: value,
      });
    }
  };

  const funcaoParaOrdenar = () => {
    const { column, sort } = estadoSort;
    const planetasComSort = filtroGeralDosPlanetas.sort((a, b) => {
      if (sort === 'ASC') {
        return a[column] - b[column];
      } return b[column] - a[column];
    });
    // console.log(planetasComSort);
    if (column !== 'population') {
      setFiltroGeralDosPlanetas([...planetasComSort]); // sem o spred, ele não atualiza a tabela
    } else {
      const planetasSemUnknown = planetasComSort
        .filter((planeta) => planeta.population !== 'unknown');
      const planetasComUnknown = planetasComSort
        .filter((planeta) => planeta.population === 'unknown');
      setFiltroGeralDosPlanetas([...planetasSemUnknown, ...planetasComUnknown]);
    }
  };

  return (
    <section>
      <label htmlFor="selectSort">
        <select
          name="selectSort"
          id="selectSort"
          data-testid="column-sort"
          onChange={ sortRadioESelect }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="sortRadio">
        <input
          name="sortRadio" // é interligando o name com o htmlFor que consigo escolher apenas um radio
          id="sortRadio"
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ sortRadioESelect }
        />
        Ascendente
        <input
          name="sortRadio"
          id="sortRadio"
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ sortRadioESelect }
        />
        Descendente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ funcaoParaOrdenar }
      >
        Ordenar
      </button>
    </section>
  );
}

export default FiltroOrdenacao;

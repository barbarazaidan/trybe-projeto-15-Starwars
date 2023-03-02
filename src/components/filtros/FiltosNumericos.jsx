import React, { useContext } from 'react';
import ApiContext from '../../context/ApiContext';

function FiltosNumericos() {
  const contextInfo = useContext(ApiContext);
  const {
    handleChangeSelects, clickBotaoFiltrar, filtroColunas, filtrosSelecionados,
  } = contextInfo;

  return (
    <div>
      <label htmlFor="filtroColuna">
        Coluna
        <select
          id="filtroColuna"
          name="coluna"
          data-testid="column-filter"
          onChange={ handleChangeSelects }
        >
          {filtroColunas.map((coluna) => (
            <option key={ coluna } value={ coluna }>{coluna}</option>
          ))}
        </select>
      </label>
      <label htmlFor="filtroOperador">
        Operador
        <select
          id="filtroOperador"
          name="operador"
          data-testid="comparison-filter"
          onChange={ handleChangeSelects }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="filtroValor">
        <input
          type="number"
          name="numero"
          value={ filtrosSelecionados.numero }
          data-testid="value-filter"
          onChange={ handleChangeSelects }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => clickBotaoFiltrar() }
      >
        Filtar
      </button>
    </div>
  );
}

export default FiltosNumericos;

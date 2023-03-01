import React, { useContext } from 'react';
import ApiContext from '../../context/ApiContext';

function FiltosNumericos() {
  const contextInfo = useContext(ApiContext);
  const {
    handleChangeSelects, clickBotaoFiltrar,
  } = contextInfo;

  // const [isDisabled, setIsDisabled] = useState(true);

  //   useEffect(() => {
  //     if (planetasApi.length > 0) {
  //       setIsDisabled(false);
  //     }
  //   }, [planetasApi]);

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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
          defaultValue="0"
          data-testid="value-filter"
          onChange={ handleChangeSelects }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        // disabled={ isDisabled }
        onClick={ () => clickBotaoFiltrar() }
      >
        Filtar
      </button>
    </div>
  );
}

export default FiltosNumericos;

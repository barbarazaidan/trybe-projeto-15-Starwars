import React, { useContext, useEffect, useState } from 'react';
import ApiContext from '../../context/ApiContext';

function FiltroNome() {
  const contextInfo = useContext(ApiContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const { handleChangeName, planetasApi } = contextInfo;

  useEffect(() => {
    if (planetasApi.length > 0) {
      setIsDisabled(false);
    }
  }, [planetasApi]);

  return (
    <label htmlFor="filtroNome">
      <input
        id="filtroNome"
        name="nome"
        data-testid="name-filter"
        type="text"
        placeholder="Filtrar por nome"
        disabled={ isDisabled }
        onChange={ handleChangeName }
      />
    </label>
  );
}

export default FiltroNome;

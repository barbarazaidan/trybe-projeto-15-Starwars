import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import ApiContext from '../context/ApiContext';

function TableHeader(props) {
  const [chaves, setChaves] = useState([]);
  const { planetas } = props;
  // console.log(planetas);

  // SE USO COM O CONTEXT API, DÁ ERRO POR CONTA DO DELAY DA CHAMADA DO FETCH
  //   const [planetas, setPlanetas] = useState([]);
  //   const planetasAPI = useContext(ApiContext);

  //   useEffect(() => {
  //     setPlanetas(planetasAPI);
  //     const chavesDaAPI = Object.keys(planetas[0]);
  //     setChaves(chavesDaAPI);
  //   }, [planetasAPI, planetas, chaves]);

  useEffect(() => {
    const chavesDaAPI = Object.keys(planetas[0]);
    setChaves(chavesDaAPI);
  }, [planetas]);

  return (
    <tr>
      {chaves.map((chave) => (
        <th key={ chave }>{chave}</th>
      ))}
    </tr>
  );
}

TableHeader.propTypes = {
  planetas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default TableHeader;

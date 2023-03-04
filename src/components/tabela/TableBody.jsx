import React, { useContext } from 'react';
import ApiContext from '../../context/ApiContext';

function TableBody() {
  const contextInfo = useContext(ApiContext);
  const { planetasFiltradosGeral } = contextInfo;

  return (
    planetasFiltradosGeral.map((planeta) => (
      <tr key={ planeta.name }>
        <td>{planeta.name}</td>
        <td>{planeta.rotation_period}</td>
        <td>{planeta.orbital_period}</td>
        <td>{planeta.diameter}</td>
        <td>{planeta.climate}</td>
        <td>{planeta.gravity}</td>
        <td>{planeta.terrain}</td>
        <td>{planeta.surface_water}</td>
        <td>{planeta.population}</td>
        <td>{planeta.films}</td>
      </tr>
    ))
  );
}

export default TableBody;

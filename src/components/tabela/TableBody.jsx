import React from 'react';
import PropTypes from 'prop-types';

function TableBody(props) {
  const { planetas } = props;

  return (
    planetas.map((planeta) => (
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

TableBody.propTypes = {
  planetas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default TableBody;

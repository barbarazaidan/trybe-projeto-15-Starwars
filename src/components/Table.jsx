import React, { useContext, useEffect, useState } from 'react';
import ApiContext from '../context/ApiContext';
// import TableHeader from './TableHeader';

function Table() {
  const [carregando, setCarregando] = useState(true);
  const [planetas, setPlanetas] = useState([]);
  const [chaves, setChaves] = useState([]);
  // const [valores, setValores] = useState([]);
  const planetasAPI = useContext(ApiContext); // pego os dados da API que estão salvos no "estado global"

  console.log(planetas);

  // useEffect(() => {
  // deu erro no lint pedindo desestruturação do planetasAPI.length
  //   if (planetasAPI.length !== 0) {
  //     setCarregando(false);
  //   } else setCarregando(true);
  // }, [planetasAPI, carregando]);

  useEffect(() => {
    setPlanetas(planetasAPI);
    if (planetas.length !== 0) {
      setCarregando(false);
      const chavesDaAPI = Object.keys(planetas[0]);
      // const valoresDaAPI = planetas.map((planeta) => Object.values(planeta));
      // setValores(valoresDaAPI);
      // valoresDaAPI.map((valor) => valor.map((aqui) => console.log(aqui)));
      setChaves(chavesDaAPI);
    } else setCarregando(true);
  }, [planetasAPI, planetas, carregando]);

  // useEffect(() => {
  //   setPlanetas(planetasAPI);
  //   if (planetas.length !== 0) {
  //     setCarregando(false);
  //   } else setCarregando(true);
  // }, [planetasAPI, planetas, carregando]);

  return (
    carregando ? (
      <p>Carregando...</p>
    ) : (
      <table>
        <thead>
          <tr>
            {chaves.map((chave) => (
              <th key={ chave }>{chave}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planetas.map((planeta) => (
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
          ))}
        </tbody>
      </table>
    )
  );
}

export default Table;

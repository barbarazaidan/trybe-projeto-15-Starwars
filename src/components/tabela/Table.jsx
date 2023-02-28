import React, { useContext, useEffect, useState } from 'react';
import ApiContext from '../../context/ApiContext';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

function Table() {
  const [carregando, setCarregando] = useState(true);
  const [planetas, setPlanetas] = useState([]);
  // const [chaves, setChaves] = useState([]);
  const contextInfo = useContext(ApiContext); // pego os dados da API que estão salvos no "estado global"
  console.log(contextInfo);
  const { planetasAPI } = contextInfo;

  // useEffect(() => {
  // deu erro no lint pedindo desestruturação do planetasAPI.length
  //   if (planetasAPI.length !== 0) {
  //     setCarregando(false);
  //   } else setCarregando(true);
  // }, [planetasAPI, carregando]);

  // useEffect(() => {
  //   setPlanetas(planetasAPI);
  //   if (planetas.length !== 0) {
  //     setCarregando(false);
  //     const chavesDaAPI = Object.keys(planetas[0]);
  //     setChaves(chavesDaAPI);
  //   } else setCarregando(true);
  // }, [planetasAPI, planetas, carregando]);

  useEffect(() => {
    // setPlanetas(planetasAPI);
    if (planetasAPI.length !== 0) {
      setCarregando(false);
    } else setCarregando(true);
  }, [planetasAPI]);

  // return (
  //   carregando ? (
  //     <p>Carregando...</p>
  //   ) : (
  //     <table>
  //       <thead>
  //         <tr>
  //           {chaves.map((chave) => (
  //             <th key={ chave }>{chave}</th>
  //           ))}
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {planetas.map((planeta) => (
  //           <tr key={ planeta.name }>
  //             <td>{planeta.name}</td>
  //             <td>{planeta.rotation_period}</td>
  //             <td>{planeta.orbital_period}</td>
  //             <td>{planeta.diameter}</td>
  //             <td>{planeta.climate}</td>
  //             <td>{planeta.gravity}</td>
  //             <td>{planeta.terrain}</td>
  //             <td>{planeta.surface_water}</td>
  //             <td>{planeta.population}</td>
  //             <td>{planeta.films}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   )
  // );

  return (
    carregando ? (
      <p>Carregando...</p>
    ) : (
      <table>
        <thead>
          <TableHeader planetas={ planetas } />
        </thead>
        <tbody>
          <TableBody planetas={ planetas } />
        </tbody>
      </table>
    )
  );
}

export default Table;

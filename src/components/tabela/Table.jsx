import React, { useContext, useEffect, useState } from 'react';
import ApiContext from '../../context/ApiContext';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

function Table() {
  const [carregando, setCarregando] = useState(true);
  const [planetas, setPlanetas] = useState([]);
  // const [chaves, setChaves] = useState([]); // usado quando renderizo toda da tabela aqui
  const contextInfo = useContext(ApiContext); // pego os dados que estão salvos no "estado global" do provider
  // console.log(contextInfo);
  const { planetasApi } = contextInfo;
  // console.log(planetasApi);

  useEffect(() => {
    // console.log('chamada no useEffect', planetasApi);
    if (planetasApi.length !== 0) {
      setCarregando(false);
      setPlanetas(planetasApi);
    } else setCarregando(true);
  }, [planetasApi]);

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
          <TableHeader />
        </thead>
        <tbody>
          <TableBody planetas={ planetas } />
        </tbody>
      </table>
    )
  );
}

export default Table;

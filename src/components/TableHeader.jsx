// import React, { useContext, useState, useEffect } from 'react';
// import ApiContext from '../context/ApiContext';

// function TableHeader() {
//   const [chaves, setChaves] = useState([]);
//   const [planetas, setPlanetas] = useState([]);
//   const planetasAPI = useContext(ApiContext);

//   useEffect(() => {
//     setPlanetas(planetasAPI);
//     const chavesDaAPI = Object.keys(planetas[0]);
//     setChaves(chavesDaAPI);
//   }, [planetasAPI, planetas, chaves]);

//   return (
// <tr>
//   {chaves.map((chave) => (
//     <th key={ chave }>{chave}</th>
//   ))}
// </tr>
//   );
// }

// export default TableHeader;

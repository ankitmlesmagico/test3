// import React, { useEffect, useState } from 'react';

// const customReactQuery = (url) => {
//   const [products, setProducts] = useState({});
//   const [error, setError] = useState<null | boolean>(null);
//   const [loading, setloading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         setloading(true);
//         setError(false);
//         const response = await axios.get('http://localhost:4000/api/products');
//         setProducts(response.data);
//       } catch (error: any) {
//         setError(true);
//       } finally {
//         setloading(false);
//       }
//     })();
//   }, []);
// };

// export default customReactQuery;

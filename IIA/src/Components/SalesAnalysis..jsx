// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Plot from 'react-plotly.js';

// const SalesAnalysis = () => {
//   const [salesData, setSalesData] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8081/sales_anal')
//       .then(response => {
//         setSalesData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching sales analysis data: ' + error.stack);
//       });
//   }, []);

//   return (
//     <div className='mb-[50px]'>
//       <h2>Sales Analysis</h2>
//       <Plot
//         data={[
//           {
//             x: salesData.map(entry => entry.ProductID),
//             y: salesData.map(entry => entry.totalQuantity),
//             type: 'bar',
//             name: 'Total Quantity Sold',
//             marker: { color: 'purple' } // Customize the color if needed
//           }
//         ]}
//         layout={{
//           title: 'Sales Analysis - Total Quantity Sold per Product',
//           xaxis: { title: 'Product ID' },
//           yaxis: { title: 'Total Quantity Sold' }
//         }}
//       />
//     </div>
//   );
// };

// export default SalesAnalysis;

import  { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const ProductQuantityAnalysis = () => {
  const [productQuantityData, setProductQuantityData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/sales_anal')
      .then(response => {
        setProductQuantityData(response.data);
      })
      .catch(error => {
        console.error('Error fetching product quantity analysis data: ' + error.stack);
      });
  }, []);

  return (
    <div className='mb-[50px]'>
      <h2>Product Quantity Analysis</h2>
      <Plot
        data={[
          {
            x: productQuantityData.map(entry => entry.ProductName),
            y: productQuantityData.map(entry => entry.Quantity),
            type: 'bar',
            name: 'Quantity',
            marker: { color: 'teal' } // Customize the color if needed
          }
        ]}
        layout={{
          title: 'Product Quantity Analysis - Quantity Sold per Product',
          xaxis: { title: 'Product Name' },
          yaxis: { title: 'Quantity' }
        }}
      />
    </div>
  );
};

export default ProductQuantityAnalysis;


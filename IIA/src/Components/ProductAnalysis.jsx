import  { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const ProductAnalysis = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/product_anal')
      .then(response => {
        setProductData(response.data);
      })
      .catch(error => {
        console.error('Error fetching product analysis data: ' + error.stack);
      });
  }, []);

  return (
    <div className='mb-[50px]'>
      <h2>Product Analysis</h2>
      <Plot
        data={[
          {
            x: productData.map(entry => entry.ProductName),
            y: productData.map(entry => entry.totalSales),
            type: 'bar',
            name: 'Total Sales',
            marker: { color: 'green' } // Customize the color if needed
          }
        ]}
        layout={{
          title: 'Product Analysis - Total Sales',
          xaxis: { title: 'Product Name' },
          yaxis: { title: 'Total Sales' }
        }}
      />
    </div>
  );
};

export default ProductAnalysis;

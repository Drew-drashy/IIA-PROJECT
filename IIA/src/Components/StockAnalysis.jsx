import { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const StockAnalysis = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/stock_anal')
      .then(response => {
        setStockData(response.data);
      })
      .catch(error => {
        console.error('Error fetching stock analysis data: ' + error.stack);
      });
  }, []);

  return (
    <div className='mb-[50px]'>
      <h2>Stock Analysis</h2>
      <Plot
        data={[
          {
            x: stockData.map(entry => entry.CategoryName),
            y: stockData.map(entry => entry.totalStock),
            type: 'bar',
            name: 'Total Stock'
          }
        ]}
        layout={{
          title: 'Stock Analysis by Category',
          xaxis: { title: 'Category' },
          yaxis: { title: 'Total Stock' }
        }}
      />
    </div>
  );
};

export default StockAnalysis;

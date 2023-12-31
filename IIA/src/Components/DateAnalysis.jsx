import  { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const DateAnalysis = () => {
  const [salesMonthlyData, setSalesMonthlyData] = useState([]);

  useEffect(() => {
    // Fetch data from your server or API
    axios.get('http://localhost:8081/date_anal')
      .then(response => {
        setSalesMonthlyData(response.data);
      })
      .catch(error => {
        console.error('Error fetching sales monthly analysis data: ' + error.stack);
      });
  }, []);

  return (
    <div className='mb-[50px]'>
      <h2>Sales Monthly Analysis</h2>
      <Plot
        data={[
          {
            x: salesMonthlyData.map(entry => `${entry.ShortMonth}-${entry.Year}`),
            y: salesMonthlyData.map(entry => entry.MonthlySales),
            type: 'line',
            mode: 'markers+lines',
            name: 'Monthly Sales',
            marker: { color: 'blue' } // Customize the color if needed
          }
        ]}
        layout={{
          title: 'Monthly Sales Analysis',
          xaxis: { title: 'Time Period' },
          yaxis: { title: 'Monthly Sales' }
        }}
      />
    </div>
  );
};

export default DateAnalysis;

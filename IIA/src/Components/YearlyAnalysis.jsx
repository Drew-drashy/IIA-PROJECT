import { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const YearlyAnalysis = () => {
  const [yearlySalesData, setYearlySalesData] = useState([]);

  useEffect(() => {
    // Fetch data from your server or API
    axios.get('http://localhost:8081/yearly_anal')
      .then(response => {
        setYearlySalesData(response.data);
      })
      .catch(error => {
        console.error('Error fetching yearly sales analysis data: ' + error.stack);
      });
  }, []);

  return (
    <div className='mb-[50px]'>
      <h2>Yearly Sales Analysis</h2>
      <Plot
        data={[
          {
            x: yearlySalesData.map(entry => entry.Year),
            y: yearlySalesData.map(entry => entry.YearlySales),
            type: 'bar',
            name: 'Yearly Sales',
            marker: { color: 'green' } // Customize the color if needed
          }
        ]}
        layout={{
          title: 'Yearly Sales Analysis',
          xaxis: { title: 'Year' },
          yaxis: { title: 'Yearly Sales' }
        }}
      />
    </div>
  );
};

export default YearlyAnalysis;

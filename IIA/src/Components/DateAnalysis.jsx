import { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const DateAnalysis = () => {
  const [dateData, setDateData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/date_anal')
      .then(response => {
        setDateData(response.data);
      })
      .catch(error => {
        console.error('Error fetching date analysis data: ' + error.stack);
      });
  }, []);

  return (
    <div className='mb-[50px]'>
      <h2>Date Analysis</h2>
      <Plot
        data={[
          {
            x: dateData.map(entry => entry.TimePeriod),
            y: dateData.map(entry => entry.totalSales),
            type: 'line',
            name: 'Total Sales',
            marker: { color: 'orange' } // Customize the color if needed
          }
        ]}
        layout={{
          title: 'Date Analysis - Total Sales over Time',
          xaxis: { title: 'Time Period' },
          yaxis: { title: 'Total Sales' }
        }}
      />
    </div>
  );
};

export default DateAnalysis;

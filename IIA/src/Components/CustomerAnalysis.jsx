import { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const CustomerAnalysis = () => {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/cust_anal')
      .then(response => {
        setCustomerData(response.data);
      })
      .catch(error => {
        console.error('Error fetching customer analysis data: ' + error.stack);
      });
  }, []);

  return (
    <div className='mb-[50px]'>
      <h2>Customer Analysis</h2>
      <Plot
        data={[
          {
            x: customerData.map(entry => entry.City),
            y: customerData.map(entry => entry.customerCount),
            type: 'bar',
            name: 'Customer Count',
            marker: { color: 'blue' } // Customize the color if needed
          }
        ]}
        layout={{
          title: 'Customer Analysis by City',
          xaxis: { title: 'City' },
          yaxis: { title: 'Customer Count' }
        }}
      />
    </div>
  );
};

export default CustomerAnalysis;

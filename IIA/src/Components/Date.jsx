import { useState, useEffect } from 'react';
import axios from 'axios';

function Date() {
  const [dateData, setdateData] = useState([]);

  useEffect(() => {
    // Fetch data from your Node.js server
    axios.get('http://localhost:8081/date_data')
      .then(response => {
        setdateData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='mt-[50px] bg-pink w-[50%] mx-[200px] content-center'>
      <h1 className='font-bold mb-[40px] ml-[50px]'>Date Data</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Time_ID</th>
            <th>Date</th>
            <th>Month</th>
            <th>Year</th>
            

            {/* Add more table headers based on your API response */}
          </tr>
        </thead>
        <tbody>
          {dateData.map(date => (
            <tr key={date.Time_ID}>
              <td>{date.Date}</td>
              <td>{date.Month}</td>
              <td>{date.Year}</td>
              {/* Add more table cells based on your API response */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Date;

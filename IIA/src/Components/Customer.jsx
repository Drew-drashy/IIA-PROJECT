import { useState, useEffect } from 'react';
import axios from 'axios';

function Customer() {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    // Fetch data from your Node.js server
    axios.get('http://localhost:8081/customer_data')
      .then(response => {
        setCustomerData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='mt-[50px] bg-pink w-[50%] mx-[200px] content-center'>
      <h1 className='font-bold mb-[40px] ml-[50px]'>Customer Data</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone No</th>
            <th>Address</th>
            <th>City</th>
            <th>Pin</th>

            {/* Add more table headers based on your API response */}
          </tr>
        </thead>
        <tbody>
          {customerData.map(customer => (
            <tr key={customer.id}>
              <td>{customer.ID}</td>
              <td>{customer.Name}</td>
              <td>{customer.Phone}</td>
              <td>{customer.Address}</td>
              <td>{customer.City}</td>
              <td>{customer.Pin}</td>
              {/* Add more table cells based on your API response */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customer;

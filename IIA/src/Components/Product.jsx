import { useState, useEffect } from 'react';
import axios from 'axios';

function Product() {
  const [productData, setproductData] = useState([]);

  useEffect(() => {
    // Fetch data from your Node.js server
    axios.get('http://localhost:8081/product_data')
      .then(response => {
        setproductData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='mt-[50px] bg-pink w-[50%] mx-[200px] content-center'>
      <h1 className='font-bold mb-[40px] ml-[50px]'>Product Data</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ProductID</th>
            <th>ProductName</th>
            <th>CategoryID</th>
            <th>Price</th>
            <th>Quantity</th>

            {/* Add more table headers based on your API response */}
          </tr>
        </thead>
        <tbody>
          {productData.map(product => (
            <tr key={product.ProductID}>
              <td>{product.ProductID}</td>
              <td>{product.ProductName}</td>
              <td>{product.CategoryID}</td>
              <td>{product.Price}</td>
              <td>{product.Quantity}</td>
              {/* Add more table cells based on your API response */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Product;

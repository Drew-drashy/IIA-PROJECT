import { useState, useEffect } from 'react';
import axios from 'axios';

function Category() {
  const [category_Data, setcategory_Data] = useState([]);

  useEffect(() => {
    // Fetch data from your Node.js server
    axios.get('http://localhost:8081/category_data')
      .then(response => {
        setcategory_Data(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='mt-[50px] bg-pink w-[50%] mx-[200px] content-center'>
      <h1 className='font-bold mb-[40px] ml-[50px]'>Category Data</h1>
      <table border="1">
        <thead>
          <tr>
            <th>CategoryID</th>
            <th>CategoryName</th>
            <th>Description</th>
            
            {/* Add more table headers based on your API response */}
          </tr>
        </thead>
        <tbody>
          {category_Data.map(category => (
            <tr key={category.CategoryID}>
              <td>{category.CategoryID}</td>
              <td>{category.CategoryName}</td>
              <td>{category.Description}</td>
              
              {/* Add more table cells based on your API response */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Category;

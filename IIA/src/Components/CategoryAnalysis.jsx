import  { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const CategoryAnalysis = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/category_anal')
      .then(response => {
        setCategoryData(response.data);
      })
      .catch(error => {
        console.error('Error fetching category analysis data: ' + error.stack);
      });
  }, []);

  return (
    <div className='mb-[50px]'>
      <h2>Category Analysis</h2>
      <Plot
        data={[
          {
            labels: categoryData.map(entry => entry.CategoryName),
            values: categoryData.map(entry => entry.productCount),
            type: 'pie',
            name: 'Product Count',
            marker: { colors: ['red', 'blue', 'green', 'purple', 'orange'] } // Customize the colors if needed
          }
        ]}
        layout={{
          title: 'Category Analysis - Product Distribution',
        }}
      />
    </div>
  );
};

export default CategoryAnalysis;

import { useState } from 'react';
import Customer from './Customer';
import Product from './Product';
import Category from './Category';
import DateComponent from './Date'; // Renamed to avoid conflict with JavaScript Date
import Sales from './Sales';
import Stock from './Stock';


const Main = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleButtonClick = (component) => {
    setSelectedComponent(component);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'customer':
        return <Customer />;
      case 'product':
        return <Product />;
      case 'category':
        return <Category />;
      case 'date':
        return <DateComponent />;
      case 'sales':
        return <Sales />;
      case 'stock':
        return <Stock />;
      default:
        return null;
    }
  };



  return (
    
    <div>
      
      {/* Buttons to switch components */}
      <div className='flex mt-[-50px] mx-[20px]'>
        <button className='border rounded w-[180px] h-[40px] bg-slate-400 mr-[50px] font-bold ease-in-out duration-300 hover:text-white' onClick={() => handleButtonClick('customer')}>Show Customer</button>
        <button className='border rounded w-[180px] h-[40px] bg-slate-400 mr-[50px] font-bold ease-in-out duration-300 hover:text-white' onClick={() => handleButtonClick('product')}>Show Product </button>
        <button className='border rounded w-[180px] h-[40px] bg-slate-400 mr-[50px] font-bold ease-in-out duration-300 hover:text-white' onClick={() => handleButtonClick('category')}>Show Category</button>
        <button className='border rounded w-[180px] h-[40px] bg-slate-400 mr-[50px] font-bold ease-in-out duration-300 hover:text-white' onClick={() => handleButtonClick('date')}>Show Date</button>
        <button className='border rounded w-[180px] h-[40px] bg-slate-400 mr-[50px] font-bold ease-in-out duration-300 hover:text-white' onClick={() => handleButtonClick('sales')}>Show Sales</button>
        <button className='border rounded w-[180px] h-[40px] bg-slate-400 mr-[50px] font-bold ease-in-out duration-300 hover:text-white' onClick={() => handleButtonClick('stock')}>Show Stock</button>
      </div>

      {/* Render the selected component */}
      {renderSelectedComponent()}

    </div>
  );
};

export default Main;

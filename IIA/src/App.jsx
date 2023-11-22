import './App.css'
// import ReactDOM from "react-dom/client";
import Main2 from './Components/Main2'
import Analysis from './Components/Analysis'
import Footer from './Components/Footer'
import { BrowserRouter as Router,Routes, Route, BrowserRouter} from 'react-router-dom';
import Analysis2 from './Components/Analysis2/Analysis2';

function App() {
  
  return (
    
    <div>
      {/* <Header/>
      <Main/>  */}
      
      <Routes>
        
        <Route path='/' element={<Main2/>}></Route>
      
        <Route path ='/analysis' element={<Analysis/>}></Route>
        <Route path ='/analysis2' element={<Analysis2/>}></Route>
        
      </Routes>
    <Footer/>
    
    </div>
  )
}

export default App


import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Policy from './Pages/Policy';
import PageNotFound from './Pages/PageNotFound';
import ContactUs from './Pages/ContactUs';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/policy' element={<Policy/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/*' element={<PageNotFound/>}/>


  </Routes>
    </>
  )
}

export default App

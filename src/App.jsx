import './App.css';
import { useState } from 'react';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from "./Pages/Shop"
import ShopCategory from "./Pages/ShopCategory"
import Product from "./Pages/Product"
import Cart from "./Pages/Cart"
import LoginSignup from "./Pages/LoginSignup"
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import  robot from "./Components/Assets/robot.png"
import Assistent from './Components/Assistent/Assistent';
import SearchItemcart from './Components/SearchItemCart/SearchItemcart';
import PaymentSuccess from './Components/Payment-success/PaymentSuccess';


function App() {
  console.log(import.meta.env.VITE_BASE_URL);
  
  const [open, setOpen] = useState(false)
  console.log(open);
  
  return (
    <div>
      {
        open ? (<Assistent />) : null
      }
      <BrowserRouter >
        <Navbar/>
        <Routes>
          <Route path='/' element={<Shop/>} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>} />
          <Route path='/kids' element={<ShopCategory  banner={kid_banner} category="kid"/>} />
          <Route path="product" element={<Product />} >
              <Route path=":productId" element={<Product/>}/>
          </Route>
          <Route path='/searchcart' element={<SearchItemcart/>} >
              <Route path=":name" element={<SearchItemcart/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>} />
          <Route path='/login' element={<LoginSignup/>} />
          <Route path='/payment-success' element={<PaymentSuccess/>} />

        </Routes>
        <div className='assistent' onClick={e=>setOpen(pre=> !pre)}>
          <img src={robot} alt="" />
          </div>
        <Footer />
      </BrowserRouter>



    </div>
  );
}

export default App;


// then fine
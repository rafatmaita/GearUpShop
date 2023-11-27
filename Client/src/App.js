
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './componete/NavBar';
import Home from './pages/Home';
import ShopAll from './pages/ShopAll';
import ContactUs from './pages/ContactUs';
import AboutUs from './componete/AboutUs';
import SignUp from './pages/SignUp';
import ShopingCatr from './pages/SopingCart';
import Login from './pages/Login';
import ProductDetales from './pages/ProductDetales';
import Payment from './pages/Payment';
import Categories from './componete/Categories';
import Clean from './pages/categorise/Clean';
import Tools from './pages/categorise/Tools';
import Mobile from './pages/categorise/Mobile';
import Seafety from './pages/categorise/Seafety';
import Light from './pages/categorise/Light';
import Accessories from './pages/categorise/Accessories';
import Footer from './componete/Footer';
import Profile from './pages/Profile';
import Dashbord from './pages/Dashboard/Dashbord';
import { AuthProvider } from './componete/AuthContext'; // استيراد AuthProvider
import UsersTable from './componete/Dashboard/UsersTable';
import ProductTable from './componete/Dashboard/ProductTable';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shopall' element={<ShopAll />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/shopingcart' element={<ShopingCatr />} />
          <Route path='/login' element={<Login />} />
          <Route path='/products/:productId' element={<ProductDetales />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/clean' element={<Clean />} />
          <Route path='/tools' element={<Tools />} />
          <Route path='/mobile' element={<Mobile />} />
          <Route path='/seafety' element={<Seafety />} />
          <Route path='/light' element={<Light />} />
          <Route path='/accessories' element={<Accessories />} />
          <Route path='/profile' element={<Profile />} />
          
          <Route path='/dashboard' element={<Dashbord />} />
          <Route path='/usertable' element={<UsersTable />} />
          <Route path='/producttable' element={<ProductTable />} />
          //
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;



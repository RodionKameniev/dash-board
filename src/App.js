import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {Navigation} from './features/navigation/Navigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Registration } from './features/registration/Registration';
import { MainPage } from './features/mainPage/MainPage';
import { History } from './features/history/History';
import { Products } from './features/Products/Products';
import { MyAccountInfo } from './features/MyAccountInfo/MyAccountInfo';
import { LogOut } from './features/registration/LogOut';
import { AddProduct } from './features/Products/AddProduct';
import { Orders } from './features/orders/Orders';
import { MyActiveOrders } from './features/orders/MyActiveOrders';
import { DeleteOrder } from './features/orders/DeleteOrder';
import { MyProducts } from './features/Products/MyProducts';
import { EditProduct } from './features/Products/EditProduct';
import { AddAdmin } from './features/adminActions/AddAdmin';
import { AllUsers } from './features/adminActions/AllUsers';
import { EditUser } from './features/adminActions/EditUser';
import { ProductCell } from './features/Products/ProductCell';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainPage />}></Route>
      <Route path='/history' element={<History />}></Route>
      <Route path='/account' element={<MyAccountInfo />}></Route>
      <Route path='/products' element={<Products />}></Route>
      <Route path='/registration' element={<Registration />}></Route>
      <Route path='/logout' element={<LogOut />}></Route>
      <Route path='/addproduct' element={<AddProduct />}></Route>
      <Route path='/addorder' element={<Orders />}></Route>
      <Route path='/orders' element={<MyActiveOrders />}></Route>
      <Route path='/deleteanorder' element={<DeleteOrder />}></Route>
      <Route path='/myproducts' element={<MyProducts />}></Route>
      <Route path='/cellproducts' element={<ProductCell/>}></Route>
      <Route path='/editproduct' element={<EditProduct />}></Route>
      <Route path='/addadmin' element={<AddAdmin />}></Route>
      <Route path='/users' element={<AllUsers />}></Route>
      <Route path='/edituser' element={<EditUser />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

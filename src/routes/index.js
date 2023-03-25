import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import UserRegistration from '../pages/auth/UserRegitration';
import Navbar from '../components/Navbar';
import ProductDetail from '../pages/product/ProductDetail';
import Home from '../pages/home/Home';
import ProductInsert from '../pages/product/ProductInsert';
import WishList from '../pages/wishlist/WishList';
// import PrivateRoute from './routes/PrivateRoute';

const RoutesList = () => {

    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <div>
            <header className='app-header'>
                <BrowserRouter>
                    <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
                    <Routes>
                        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
                        <Route path="/register" element={<UserRegistration isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
                        <Route path='/productInsert' element={<ProductInsert isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
                        <Route path='/productDetail/:id' element={<ProductDetail />} />
                        <Route path='/home' element={<Home isLoggedIn={isLoggedIn}/>}/>
                        <Route path='/' element={<Home isLoggedIn={isLoggedIn}/>}/>
                        <Route path='/wishlist' element={<WishList/>}/>

                    </Routes>
                </BrowserRouter>
            </header>
        </div>
    );
};

export default RoutesList;
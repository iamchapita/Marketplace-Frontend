import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import UserRegistration from '../pages/auth/UserRegitration';
import Navbar from '../components/Navbar';
import ProductDetail from '../pages/product/ProductDetail';

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
                        <Route path='/productDetail' element={<ProductDetail />} />
                    </Routes>
                </BrowserRouter>
            </header>
        </div>
    );
};

export default RoutesList;
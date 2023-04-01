import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import UserRegistration from '../pages/auth/UserRegitration';
import Navbar from '../components/Navbar';
import ProductDetail from '../pages/product/ProductDetail';
import Home from '../pages/home/Home';
import ProductInsert from '../pages/product/ProductInsert';
import WishList from '../pages/wishlist/WishList';
import AdminHome from '../pages/admin/AdminHome';
import SellerHome from '../pages/seller/SellerHome';

const RoutesList = () => {

    const [isLoggedIn, setLoggedIn] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [isClient, setIsClient] = useState(null);
    const [isSeller, setIsSeller] = useState(null);
    const [isBanned, setIsBanned] = useState(null);
    const [isEnabled, setIsEnabled] = useState(null);

    return (
        <div>
            <header className='app-header'>
                <BrowserRouter>
                    <Navbar
                        isLoggedIn={isLoggedIn}
                        setLoggedIn={setLoggedIn}
                        isAdmin={isAdmin}
                        setIsAdmin={setIsAdmin}
                        isClient={isClient}
                        setIsClient={setIsClient}
                        isSeller={isSeller}
                        setIsSeller={setIsSeller}
                        isBanned={isBanned}
                        setIsBanned={setIsBanned}
                        isEnabled={isEnabled}
                        setIsEnabled={setIsEnabled}
                    />
                    <Routes>
                        {/* Rutas públicas */}
                        <Route
                            path="/login"
                            element={
                                <Login
                                    isLoggedIn={isLoggedIn}
                                    setLoggedIn={setLoggedIn}
                                    isAdmin={isAdmin}
                                    setIsAdmin={setIsAdmin}
                                    setIsClient={setIsClient}
                                    setIsSeller={setIsSeller}
                                    setIsEnabled={setIsEnabled}
                                />}

                        />
                        <Route path="/register" element={<UserRegistration isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
                        <Route path='/productDetail/:id' element={<ProductDetail />} />
                        <Route path='/home' element={<Home isLoggedIn={isLoggedIn} />} />
                        <Route path='/' element={<Home isLoggedIn={isLoggedIn} />} />

                        {/* Rutas privadas */}
                        <Route path='/myProfile' element={<SellerHome isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} isSeller={isSeller} setIsSeller={setIsSeller} />} />
                        <Route path='/productInsert' element={<ProductInsert isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
                        <Route path='/wishlist' element={<WishList isLoggedIn={isLoggedIn} />} />
                        <Route path='/admin' element={<AdminHome isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />

                    </Routes>
                </BrowserRouter>
            </header>
        </div>
    );
};

export default RoutesList;
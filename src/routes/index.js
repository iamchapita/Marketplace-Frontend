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
import MyProfile from '../pages/user/MyProfile';
import UserProfile from '../pages/user/UserProfile';
import ProductEdit from '../pages/product/ProductEdit';
import UsersModule from '../pages/admin/modules/UsersModule/UsersModule';
import ProductsModule from '../pages/admin/modules/ProductsModule/ProductsModule';
import ChatGeneral from '../components/ChatGeneral';
import Suscription from '../components/Suscription';
import PopularProduct from '../pages/popular/PopularProduct';
import ComplaintsModule from '../pages/admin/modules/ComplaintsModule/ComplaintsModule';
import ComplaintDetail from '../pages/admin/modules/ComplaintsModule/ComplaintDetail';

const RoutesList = () => {

    const [isLoggedIn, setLoggedIn] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [isClient, setIsClient] = useState(null);
    const [isSeller, setIsSeller] = useState(null);
    const [isBanned, setIsBanned] = useState(null);
    const [isEnabled, setIsEnabled] = useState(null);
    const [areUserStatusLoaded, setAreUserStatusLoaded] = useState(false);

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
                        areUserStatusLoaded={areUserStatusLoaded}
                        setAreUserStatusLoaded={setAreUserStatusLoaded}
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
                        <Route path='/productDetail/:id' element={<ProductDetail isAdmin={isAdmin} isLoggedIn={isLoggedIn} areUserStatusLoaded={areUserStatusLoaded} />} />
                        <Route path='/home' element={<Home isLoggedIn={isLoggedIn} />} />
                        <Route path='/' element={<Home isLoggedIn={isLoggedIn} />} />
                        <Route path='/popular' element={<PopularProduct isLoggedIn={isLoggedIn} />} />

                        {/* Rutas privadas */}
                        <Route path='/productInsert' element={<ProductInsert isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
                        <Route path='/wishlist' element={<WishList isLoggedIn={isLoggedIn} />} />
                        <Route path='/admin' element={<AdminHome isLoggedIn={isLoggedIn} isAdmin={isAdmin} areUserStatusLoaded={areUserStatusLoaded} />} />
                        <Route path='/myProfile' element={<MyProfile isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} areUserStatusLoaded={areUserStatusLoaded} setAreUserStatusLoaded={setAreUserStatusLoaded} />} />
                        <Route path='/productEdit/:id' element={<ProductEdit isLoggedIn={isLoggedIn} isSeller={isSeller} areUserStatusLoaded={areUserStatusLoaded} />} />
                        <Route path='/suscription' element={<Suscription isLoggedIn={isLoggedIn} />} />

                        {/* Rutas de Adminstracion */}
                        <Route path='/usersModule' element={<UsersModule isLoggedIn={isLoggedIn} isSeller={isSeller} areUserStatusLoaded={areUserStatusLoaded} />} />
                        <Route path='/productsModule' element={<ProductsModule isLoggedIn={isLoggedIn}
                        isSeller={isSeller} areUserStatusLoaded={areUserStatusLoaded} />} />
                        <Route path='/complaintsModule' element={<ComplaintsModule isLoggedIn={isLoggedIn}
                        isSeller={isSeller} areUserStatusLoaded={areUserStatusLoaded} />} />
                        <Route path='/complaintDetail/:id' element={<ComplaintDetail isLoggedIn={isLoggedIn}
                        isSeller={isSeller} areUserStatusLoaded={areUserStatusLoaded} />} />

                        <Route path='/chat' element={<ChatGeneral />} />

                        {/* Rutas segun contexto */}
                        <Route path='/userProfile/:id' element={<UserProfile isAdmin={isAdmin} areUserStatusLoaded={areUserStatusLoaded} />} />

                    </Routes>
                </BrowserRouter>
            </header>
        </div>
    );
};

export default RoutesList;
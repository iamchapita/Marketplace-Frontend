import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import UserRegistration from '../pages/auth/UserRegitration';
import '../style/style-views.css'


// import PrivateRoute from './routes/PrivateRoute';

const RoutesList = () => {

    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <div className='app'>
            <header className='app-header'>
            <BrowserRouter>
                <Routes>
                    {/* <Route path="/" element={Login} /> */}
                    <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
                    <Route path="/register" element={<UserRegistration/>} />
                </Routes>
            </BrowserRouter>
        </header>
        </div>
    );
};

export default RoutesList;
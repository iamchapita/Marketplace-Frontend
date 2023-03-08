import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import UserRegistration from '../pages/auth/UserRegitration';
import Navbar from '../components/Navbar';

// import PrivateRoute from './routes/PrivateRoute';

const RoutesList = () => {

    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <div>
            <header className='app-header'>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    {/* <Route path="/" element={Login} /> */}
                    <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
                    <Route path="/register" element={<UserRegistration isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>} />
                </Routes>
            </BrowserRouter>
        </header>
        </div>
    );
};

export default RoutesList;
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import UserRegistration from '../pages/auth/UserRegitration';

// import PrivateRoute from './routes/PrivateRoute';

const RoutesList = () => {

    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={Login} /> */}
                <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
                <Route path="/register" element={<UserRegistration/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesList;
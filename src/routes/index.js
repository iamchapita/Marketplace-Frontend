import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/auth/Login';

// import PrivateRoute from './routes/PrivateRoute';

const RoutesList = () => {
    return (
        <Routes>
            <Route path="/login" element={Login} />
        </Routes>
    );
};

export default Routes;
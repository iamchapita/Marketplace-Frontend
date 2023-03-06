import React, { useState } from 'react';
import RoutesList from './routes/index';
import Navbar from './components/Navbar';
import './App.css';


function App() {
    
    return (
        <div>
        <Navbar></Navbar>
        <RoutesList></RoutesList>
        </div>
    );
}

export default App;

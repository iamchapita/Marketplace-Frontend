import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/bar/navbar';
import Sidebar from './components/bar/sidebar';

import Login from './components/auth/login';
import RegistrationPage from './components/auth/registration.js';

import Home from './components/home/home';

import ProductForm from "./components/product/productForm";
import Agreement from "./components/auth/agreement"

function App() {

    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className="App">
            <Navbar></Navbar>
            <div className='flex'>
                <Sidebar></Sidebar>
                <div className="App-header">
                    <BrowserRouter>
                        <Routes>
                            <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} ></Route>
                            <Route path='/registro' element={<RegistrationPage />} ></Route>
                            <Route path='/crear-producto' element={<ProductForm />} ></Route>
                            <Route path='/acuerdo' element={<Agreement />} ></Route>
                            <Route path='/home' element={<Home></Home>} ></Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    );
}

export default App;

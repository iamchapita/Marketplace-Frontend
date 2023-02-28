import './App.css';
import Login from './components/auth/login';
import RegistrationPage from './components/auth/registration.js';
import Navbar from './components/bar/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import ProductForm from "./components/product/productform";

function App() {

    const [loggedIn, setLoggedIn] = useState(false);

    const login = () => {
        setLoggedIn(true);
    }

    return (
        <div className="App">
            <Navbar></Navbar>
            <header className="App-header">
                <BrowserRouter>
                    <Routes>
                        <Route path='/login' element={<Login login={login} />} ></Route>
                        <Route path='/registro' element={<RegistrationPage />} ></Route>
                        <Route path='/ingresarProducto' element={<ProductForm/>} ></Route>

                    </Routes>

                </BrowserRouter>


            </header>
        </div>
    );
}

export default App;

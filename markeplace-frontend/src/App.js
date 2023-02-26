import './App.css';
import Login from './components/auth/login';
import RegistrationPage from './components/auth/registration.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/bar/navbar';

function App() {
    return (
        <div className="App">
            <Navbar></Navbar>
            <header className="App-header">
                <BrowserRouter>
                    <Routes>
                        <Route path='/login' element={<Login />} ></Route>
                        <Route path='/registro' element={<RegistrationPage />} ></Route>
                    </Routes>

                </BrowserRouter>


            </header>
        </div>
    );
}

export default App;

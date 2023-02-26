import './App.css';
import Login from './component/sig-in/login';
import RegistrationPage from './component/sig-in/registration.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './component/bar/navbar';

function App() {
    return (
        <div className="App">
            <Navbar></Navbar>
            <header className="App-header">
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Login />} ></Route>
                        <Route path='/registro' element={<RegistrationPage />} ></Route>
                    </Routes>

                </BrowserRouter>


            </header>
        </div>
    );
}

export default App;

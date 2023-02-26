import './App.css';
import Login from './component/sig-in/login';
import RegistrationPage from './component/sig-in/registration.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="App">

            <header className="App-header">
                <BrowserRouter>
                    <Routes>
                        <Route path='/iniciarSesion' element={<Login />} ></Route>
                        <Route path='/registro' element={<RegistrationPage />} ></Route>
                    </Routes>

                </BrowserRouter>


            </header>
        </div>
    );
}

export default App;

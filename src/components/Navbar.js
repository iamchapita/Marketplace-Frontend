import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import apiClient from '../utils/apiClient';


const Navbar = ({ isLoggedIn, setLoggedIn }) => {

    const onLogout = (e) => {
        e.preventDefault();
        const registerUser = async () => {
            const logout = await apiClient.get('/logout').then(response => {
                console.log(response);
            })
        }

        registerUser();
    }

    const onLogin = () => {};

    return (
        <div>
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-item" href="/home">MarketPlace</a>
                    <button className="toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                        <span className="toggler-item">M♥</span>
                    </button>
                    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">MarketPlace</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="sidebar-item" aria-current="page" href={isLoggedIn ? '/logout' : '/login'} onClick={isLoggedIn ? onLogout : onLogin}>{isLoggedIn ? 'Cerrar Sesión' : 'Inicio de Sesión'}</a>
                                </li>
                                <li className="nav-item">
                                    {isLoggedIn ? <a className="sidebar-item" href="/">Perfil</a> : <a className="sidebar-item" href="/register">Registro</a>}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}


export default Navbar;
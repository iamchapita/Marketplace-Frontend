import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import apiClient from '../utils/apiClient';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ isLoggedIn, setLoggedIn, isAdmin, setIsAdmin, isClient, setIsClient, isSeller, setIsSeller, isBanned, setIsBanned, isEnabled, setIsEnabled, areUserStatusLoaded, setAreUserStatusLoaded }) => {

    const navigate = useNavigate();

    useEffect(() => {

        const action = async () => {

            const response = await apiClient.get('/user').then((response) => {

                localStorage.setItem('id', response.data.id);
                localStorage.setItem('isAdmin', response.data.isAdmin);
                localStorage.setItem('isClient', response.data.isClient);
                localStorage.setItem('isSeller', response.data.isSeller);
                localStorage.setItem('isEnabled', response.data.isEnabled);

                setIsAdmin(Boolean(response.data.isAdmin));
                setIsClient(Boolean(response.data.isClient));
                setIsSeller(Boolean(response.data.isSeller));
                setIsEnabled(Boolean(response.data.isEnabled));

                setLoggedIn(true);
                setAreUserStatusLoaded(true);

            }).catch((error) => {
                if (error.response.status === 401) {
                    setLoggedIn(false);
                    setAreUserStatusLoaded(true);
                }
            })
        }
        action();
    }, []);

    const onLogout = async (e) => {
        e.preventDefault();

        const response = await apiClient.get('/logout').then(response => {
            setLoggedIn(false);
            setIsAdmin(false);
            setIsClient(false);
            setIsSeller(false);
            setIsBanned(false);
            setIsEnabled(false);
            localStorage.removeItem('access_token');
            localStorage.removeItem('id');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('isClient');
            localStorage.removeItem('isSeller');
            localStorage.removeItem('isEnabled');

        }).catch(error => {
            console.log(error);
        })

        navigate('/login', { replace: true });
    }

    const onLogin = () => { };

    const convertClientInSeller = async (e) => {
        e.preventDefault();
        const response = await apiClient.post('/setToSeller', {
            id: localStorage.getItem('id')
        }).then((response) => {
            setIsSeller(true);
        }).catch(error => {
            console.log(error.response.data.message);
        });

        navigate('/productInsert', { replace: true });

    };

    if (areUserStatusLoaded) {

        if (!isAdmin) {
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
                                        {
                                            isLoggedIn ? (
                                                <li className="nav-item">
                                                    <a className="sidebar-item" aria-current="page" href='/myProfile'>Mi Perfil</a>
                                                </li>
                                            ) : (<div></div>)
                                        }
                                        {
                                            isLoggedIn ?
                                                (

                                                    isSeller ?
                                                        (
                                                            <li className="nav-item">
                                                                <a className="sidebar-item" aria-current="page" href='/productInsert'>Publicar Producto</a>
                                                            </li>
                                                        ) : (
                                                            <li className="nav-item">
                                                                <a className="sidebar-item" aria-current="page" href='/productInsert' onClick={convertClientInSeller}>Convertirme en Vendedor</a>
                                                            </li>
                                                        )
                                                ) : (<li className="nav-item">
                                                    <a className="sidebar-item" aria-current="page" href='/register' onClick={isLoggedIn ? onLogout : onLogin}>Registro de Usuario</a>
                                                </li>)
                                        }
                                        {
                                            isLoggedIn ?
                                                (
                                                    <li className="nav-item">
                                                        <a className="sidebar-item" aria-current="page" href='/wishlist'>Lista de Deseos</a>
                                                    </li>
                                                ) : (<div></div>)
                                        }
                                        <li className="nav-item">
                                            <a className="sidebar-item" aria-current="page" href={isLoggedIn ? '/logout' : '/login'} onClick={isLoggedIn ? onLogout : onLogin}>{isLoggedIn ? 'Cerrar Sesión' : 'Inicio de Sesión'}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div >
                    </nav >
                </div >
            );
        }

        if (isAdmin) {
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
                                        {
                                            isLoggedIn ?
                                                (
                                                    <li className="nav-item">
                                                        <a className="sidebar-item" aria-current="page" href={isLoggedIn ? '/logout' : '/login'} onClick={isLoggedIn ? onLogout : onLogin}>{isLoggedIn ? 'Cerrar Sesión' : 'Inicio de Sesión'}</a>
                                                    </li>
                                                ) : (<div></div>)
                                        }
                                        {
                                            isAdmin ? (<div></div>) : (<div></div>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            );
        }
    }

}

export default Navbar;
import React from "react";
import '../../style/style-navbar.css'
import Search from '../bar/search';

function Navbar(){
    return(
        <div className="Nav-Bar">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="navbar-brand text-white " href="/home">Inicio</a>
                    </li>
                    <li className="nav-item">
                    <a className="navbar-brand text-white " aria-current="page" href="/productos">Market</a>
                    </li>
                    <li className="nav-item">
                    <a className="navbar-brand text-white " href="/favoritos">Favoritos</a>
                    </li>
                    <li className="nav-item">
                    <a className="navbar-brand text-white " href="/crear-producto">Vender</a>
                    </li>
                </ul>
                    <Search></Search>
                </div>
                    <form className="d-flex" role="search">
                        <a className="navbar-brand text-white text-link " href="/login" >Iniciar Sesión</a>
                    </form>
                </div>
            </nav>
            
        </div>
    );
}
export default Navbar;
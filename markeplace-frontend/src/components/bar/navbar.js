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
                    <a className="navbar-brand text-white " href="/">Inicio</a>
                    </li>
                    <li className="nav-item">
                    <a className="navbar-brand text-white " aria-current="page" href="/">Market</a>
                    </li>
                    <li className="nav-item">
                    <a className="navbar-brand text-white " href="/">Favoritos</a>
                    </li>
                    <li className="nav-item">
                    <a className="navbar-brand text-white " href="/">Vender</a>
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
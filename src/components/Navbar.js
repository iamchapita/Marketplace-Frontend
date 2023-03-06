import React from "react";


const Navbar = () =>{

    return(
        <div>
            <nav className="navbar">
                <div className="container-fluid">
                <a className="navbar-item" href="/">Inicio</a>
                <a className="navbar-item" href="/register">Registro</a>
                <a className="navbar-item" href="/login">Inicio de Sesión</a>
                <button className="toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
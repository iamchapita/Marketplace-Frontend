import React from "react";
import '../../style/style-views.css';


const Navbar = () =>{

    return(
        <div>
            <nav className="navbar navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                <a className="navbar-brand" href="/">Inicio</a>
                <a className="navbar-brand" href="/register">Registro</a>
                <a className="navbar-brand" href="/login">Inicio de sesion</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                <span class="navbar-toggler-icon"></span>
                </button>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
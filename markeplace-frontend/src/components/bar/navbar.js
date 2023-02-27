import React from "react";

function Navbar(){
    return(
        <div className="Nav-Bar">

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="navbar-brand" href="/">Inicio</a>
                    </li>
                    <li className="nav-item">
                    <a className="navbar-brand" aria-current="page" href="/">Market</a>
                    </li>
                    <li className="nav-item">
                    <a className="navbar-brand" href="/">Favoritos</a>
                    </li>
                    <li className="nav-item">
                    <a className="navbar-brand" href="/">Vender</a>
                    </li>
                </ul>
                </div>
                <form className="d-flex" role="search">
                    <a className="navbar-brand" href="/registro" >Registrarse</a>
                    <input className="form-control me-2" type="search" placeholder="Escriba su Busqueda"/>
                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                </form>
            </div>
            </nav>
            
        </div>
    );
}
export default Navbar;
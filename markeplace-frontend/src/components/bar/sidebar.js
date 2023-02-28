import React from "react";
import "../../style/style-sidebar.css";


function Sidebar(){
    return(
        <div>
           <div className="sidebar">
                <ul className="navbar-nav side-list">
                    <li>
                        <a className="navbar-brand side-a " href="/home">Inicio</a>
                    </li>
                    <li>
                        <a className="navbar-brand side-a " href="/perfil" >Perfil</a>
                    </li>
                    <li>
                        <a className="navbar-brand side-a " href="/favoritos" >Favoritos</a>
                    </li>
                    <li>
                        <a className="navbar-brand side-a " href="/favoritos" >Lista de deseos</a>
                    </li>
                    <li>
                        <a className="navbar-brand side-a " href="/crear-producto" >Perfil Vendedor</a>
                    </li>
                    <li>
                        <a className="navbar-brand side-a " href="/login">Salir</a>
                    </li>
                </ul>
           </div>
        </div>
    );
}
export default Sidebar;
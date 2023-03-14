import React from "react";

function SidebarProducts ({name, id}){
    return(
        <div className="sidebar-products" key={id}>
            <div className="option-list">
                <ul className="menu">
                <a href="/"  className="side-option" ><i className="material-icons">person</i>{name}</a>
                </ul>
            </div>
            <div className="option-list">
                <ul className="menu" >
                    <a href="/" className="side-option">Tus Productos <i className="material-icons">inventory</i></a>
                </ul>
            </div>
            <div className="option-list">
                <ul className="menu" >
                    <a href="/" className="side-option">favoritos <i className="material-icons">favorite </i></a>
                </ul>
            </div>
            <div className="option-list">
                <ul className="menu" >
                    <a href="/" className="side-option">Pedidos <i className="material-icons">sell</i></a>
                </ul>
            </div>
            <div className="option-list">
                <ul className="menu" >
                    <a href="/" className="side-option">Market <i className="material-icons">storefront</i></a>
                </ul>
            </div>

        </div>
    )
}
export default SidebarProducts;
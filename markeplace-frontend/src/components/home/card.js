import React from "react";
import '../../style/style-card.css';
function Card ({name,photo,price, description, id}){
    ///Se va modificar
    


    //se deben hacer las funciones para la url de las fotos y id de producto
    ///
    ////
    /////



    return(
        <div>
            <div className="card" >
        
                <div className="card-body text-black">
                    <h5 className="card-title">{name}</h5>
                    <img src={photo} ></img>
                    <p className="card-text">{price}</p>
                    <p className="card-text">{description}</p>
                    <a href={id} className="navbar-link">detalles</a>
                </div>
            </div>
        </div>
    );
}
export default Card;
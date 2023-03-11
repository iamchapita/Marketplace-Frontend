import React from "react";
//import '../utilities/img/huaweip30.jpg'
function Card ({name, price, description, img, urlDetalles}){
    console.log(img);
    return(
        <div className="card">
            <img className="card-img-top" src={img}/>
            <div className="card-body" >
                <h5 className="card-title">{name}</h5>
                <h6 className="card-text" >{price}</h6>
                <p className="card-text" >{description}</p>
                <a className="card-link"  href={urlDetalles}>Detalles</a>

            </div>
        </div>
    );
}
export default Card;
import React from "react";
//import '../utilities/img/huaweip30.jpg'
function Card ({name, price, description, img, urlDetalles, id}){
    
    return(
        <div className="container card-publication">
        <div className="card">
            <div className="carousel-item active">
            <img className="img-fluid" src={img}/>
            </div>
            <div className="card-body" key={id} >
                <h5 className="card-title">{name}</h5>
                <h6 className="card-text" >{price}</h6>
                <p className="card-text" >{description}</p>
                <a className="card-link"  href={urlDetalles}>Detalles</a>
                <div className="check-container">
                <label for={`check${id}`}><i className="material-icons icon md-5" >favorite</i></label>
                <input className="check-invisible" type="checkbox" id={`check${id}`} onClick="favorite()" />
                </div>
            </div>
            
        </div>
        </div>

    );
}
export default Card;
import React, {useState, useEffect} from "react";
import CountBar from "./CountBar";


function CardWishList ({name, price, description, img, urlDetalles, id, nameSeller, idSeller, favoriteClass}){
  
    
    return(
        
        <div className="container-WL">
            <div className="cardWL">
                <div className="row">
                <div className="col-3">
                        <div>
                                <img className="img-wl" src={img}/>
                        </div>
                </div>
                <div class="col-8">
                        <div className="card-body-wl" key={id} >
                            <h5 className="card-title">{name}</h5>
                            <h6 className="card-text" >{price}</h6>
                            <p className="card-text" >{description}</p>
                            <a className="card-link"  href={urlDetalles}>Detalles</a>
                            <div className="check-container">
                            <label for={`check${id}`}><i className={`material-icons ${favoriteClass ? 'icon-favorite-active ': 'icon-favorite'}`} >favorite</i></label>
                            <input className="check-invisible" type="checkbox" id={`check${id}`}  />
                            </div>
                        </div>
                </div>    
                </div>
            </div>
        </div>

    );
}

export default CardWishList;
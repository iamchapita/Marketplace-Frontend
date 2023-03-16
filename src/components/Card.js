import React, {useState, useEffect} from "react";
import CountBar from "./CountBar";


function Card ({name, price, description, img, urlDetalles, id, nameSeller, idSeller, favoriteClass}){
    //const[favoriteClass, setFavoriteClass] = ('');
    
    //      var [user, setUser] =useState('');
    useEffect(()=>{
      
       
    },[]);

    
    return(
        
        <div className="container-home">
        
              
                <div className="container card-publication">
                   
                
                <div className="card">
                    <div className="account-container">
                        <CountBar 
                        name={nameSeller}
                        id={idSeller}
                        />
                    </div> 
                    <div className="carousel-item active">
                        <img className="img-fluid" src={img}/>
                    </div>
                    <div className="card-body" key={id} >
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

    );
}
export default Card;
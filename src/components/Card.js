import React, {useState, useEffect} from "react";
import CountBar from "./CountBar";
import apiClient from "../utils/apiClient";
function Card ({name, price, img, urlDetalles, id, idSeller, nameSeller, heard, userId}){
    const[favoriteClass, setFavoriteClass] = useState(heard);
    const[productImage, setProductImage] = useState ();

    
   

    const image = async () =>{
        apiClient.post('/getProductImages', {
            path: img }).then((res)=>{
                setProductImage(res.data[0].base64Image);
            }); 
    }
    const favorite = async (id) =>{
        let checkValue = !favoriteClass;
        setFavoriteClass(checkValue);
        if(!favoriteClass){
        await apiClient.post('/wishlistInsert', {
            productIdFK : id,
            userIdFK : userId
        }).then((res)=>{
            if(res.statusText == 'OK'){
                alert('se agrego a la lista de favoritos');
            }else{
                alert(res.data.error);
            }
        });
       
    }else{
        
        await apiClient.post('/wishlistDelete',  {
            productIdFK : id,
            userIdFK : userId

        }).then((res)=>{
            if(res.statusText == 'OK'){
                alert('se elimino de la lista de favoritos');
            }else{
                alert(res.data.error);
            }
        });
        
    }
    }
    
 
    useEffect(()=>{
      image();
       
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
                    <div className="col-5">
                    <div className="carousel-item active">
                        <img className="img-fluid" src={`data:image/jpg;base64,${productImage}`}/>
                    </div>
                    </div>
                    <div className="card-body" key={id} >
                        <h5 className="card-title">{name}</h5>
                        <h6 className="card-text" >{price}</h6>
                        <a className="card-link"  href={urlDetalles}>Detalles</a>
                        <div className="check-container">
                        <label id={`labelCheck${id}`}  htmlFor={`check${id}`}><i className={`material-icons ${favoriteClass ? 'icon-favorite-active ': 'icon-favorite'}`} >favorite</i></label>
                        <input className="check-invisible" onClick={()=>favorite(id)} type="checkbox" id={`check${id}`}  />
                        </div>
                    </div>

                </div>    
            
            </div>
        </div>

    );
}
export default Card;
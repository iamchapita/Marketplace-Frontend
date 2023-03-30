import React, {useState, useEffect} from "react";
import apiClient from "../utils/apiClient";


function CardWishList ({name, price, img, urlDetalles, id, idSeller, userId}){
  
    const[favoriteClassWL, setFavoriteClassWL] = useState(true);
    var [productImage, setProductImage] = useState();


    const image = async () =>{
        apiClient.post('/getProductImages', {
            path: img }).then((res)=>{
                setProductImage(res.data[0].base64Image);
            }); 
    }


    const favorite = async (id) =>{

        var checkValue = !favoriteClassWL;
        setFavoriteClassWL(checkValue);
        if(!favoriteClassWL){
        await apiClient.post('/wishlistInsert', {
            productIdFK : id,
            userIdFK : userId
        });
        alert('se agregó a lista de favoritos');
        }else{
        await apiClient.post('/wishlistDelete',  {
            productIdFK : id,
            userIdFK : userId
        });
        alert('se eliminó de la lista de deseos')
    }
    }
    
 
    useEffect(()=>{
      image();
    },[]);

    return(
        
        <div className="container-WL">
            <div className="cardWL">
                <div className="row center">
                <div className="col-3">
                        <div>
                            <img className="img-wl" src={`data:image/jpg;base64,${productImage}`}/>
                        </div>
                </div>
                <div className="col-8">
                        <div className="card-body-wl" key={id} >
                            <h5 className="card-title">{name}</h5>
                            <h6 className="card-text">L {price}</h6>
                            <a className="card-link"  href={urlDetalles}>Detalles</a>
                            <div className="check-container">
                            <label id={`labelCheck${id}`}  htmlFor={`checkwish${id}`}><i className={`material-icons ${favoriteClassWL ? 'icon-favorite-active ': 'icon-favorite'}`} >favorite</i></label>
                            <input className="check-invisible" onClick={()=>favorite(id)} type="checkbox" id={`checkwish${id}`} checked />
                            </div>
                        </div>
                </div>    
                </div>
            </div>
        </div>

    );
}

export default CardWishList;
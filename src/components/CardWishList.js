import React, {useState, useEffect} from "react";
import CountBar from "./CountBar";
import apiClient from "../utils/apiClient";


function CardWishList ({name, price, description, img, urlDetalles, id, idSeller}){
  
    const[favoriteClassWL, setFavoriteClassWL] = useState(false);
    const[userId, setUserId] =useState();
    var [nameUser, setNameUser] =useState('');
    var [productImage, setProductImage] = useState();

    const user = () =>{
        apiClient.get('/user').then((res)=>{
            //console.log(res.data.id);
            setUserId(res.data.id);
        });
       
    }

    const image = async () =>{
        apiClient.post('/getProductImages', {
            path: img }).then((res)=>{
                setProductImage(res.data[0].base64Image);
            }); 
    }

    const getNameUser = async (idSeller) => {
        await apiClient.post('/sellerDetails', {
            id : idSeller
        }).then((res)=>{
            setNameUser(res.data.name);
        });
    }

    const favorite = async (id) =>{

        var checkValue = document.getElementById('checkwish'+id).checked;
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
            userIdFK : userId,
        });
        alert('se eliminó de la lista de deseos')
    }
    }
    
 
    useEffect(()=>{
      getNameUser(idSeller);
      user();
      image();
    },[]);

    return(
        
        <div className="container-WL">
            <div className="cardWL">
                <div className="row">
                <div className="col-3">
                        <div>
                            <img className="img-wl" src={`data:image/jpg;base64,${productImage}`}/>
                        </div>
                </div>
                <div className="col-8">
                        <div className="card-body-wl" key={id} >
                            <h5 className="card-title">{name}</h5>
                            <h6 className="card-text" >{price}</h6>
                            <p className="card-text" >{description}</p>
                            <a className="card-link"  href={urlDetalles}>Detalles</a>
                            <div className="check-container">
                            <label id={`labelCheck${id}`}  htmlFor={`checkwish${id}`}><i className={`material-icons ${favoriteClassWL ? 'icon-favorite-active ': 'icon-favorite'}`} >favorite</i></label>
                            <input className="check-invisible" onClick={()=>favorite(id)} type="checkbox" id={`checkwish${id}`}  />
                            </div>
                        </div>
                </div>    
                </div>
            </div>
        </div>

    );
}

export default CardWishList;
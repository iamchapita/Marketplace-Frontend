import React, {useState, useEffect} from "react";
import CountBar from "./CountBar";
import apiClient from "../utils/apiClient";
function Card ({name, price, img, urlDetalles, id, idSeller}){
    const[favoriteClass, setFavoriteClass] = useState();
    const[userId, setUserId] =useState();
    const[productImage, setProductImage] = useState ();

    
    var [nameUser, setNameUser] =useState('');

    const user = () =>{
        apiClient.get('/user').then((res)=>{
            
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

        var checkValue = document.getElementById('check'+id).checked;
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
            userIdFK : userId,

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
      getNameUser(idSeller);
      user();
      image();
       
    },[]);

    
    return(
        
        <div className="container-home">
        
              
                <div className="container card-publication">
                   
                
                <div className="card">
                    <div className="account-container">
                        <CountBar 
                        name={nameUser}
                        id={idSeller}
                        />
                    </div> 
                    <div className="carousel-item active">
                        <img className="img-fluid" src={`data:image/jpg;base64,${productImage}`}/>
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
import React, {useState, useEffect} from "react";
import CountBar from "./CountBar";
import apiClient from "../utils/apiClient";
function Card ({name, price, description, img, urlDetalles, id, idSeller}){
    const[favoriteClass, setFavoriteClass] = useState(false);
    const[userId, setUserId] =useState();
    
    var [nameUser, setNameUser] =useState('');

    const user = () =>{
        apiClient.get('/user').then((res)=>{
            //console.log(res.data.id);
            setUserId(res.data.id);
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
        var addedDate = new Date();
        setFavoriteClass(checkValue);
        if(favoriteClass){
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
        alert('se agregó a lista de favoritos');
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
        alert('se eliminó de la lista de deseos')
    }
    }
    
 
    useEffect(()=>{
      getNameUser(idSeller);
      user();
       
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
                        <img className="img-fluid" src={img}/>
                    </div>
                    <div className="card-body" key={id} >
                        <h5 className="card-title">{name}</h5>
                        <h6 className="card-text" >{price}</h6>
                        <p className="card-text" >{description}</p>
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
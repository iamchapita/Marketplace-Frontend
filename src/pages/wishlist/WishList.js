import React, {useState, useEffect, lazy, Suspense} from "react";
import { Spinner } from "react-bootstrap";

//import CardWishList from "../../components/CardWishList";
//import images from "../../utilities/json-images/images";
import apiClient from "../../utils/apiClient";

const CardWishList = lazy(()=>import("../../components/CardWishList"));


function WishList (){

    var [products , setProduts]=useState(['']);
    var [user, setUser]=useState('');
 
    const getWishlist = async (id) =>{
        apiClient.post('/wishlist', {userIdFK : id}).then((res)=>{
            setProduts(res.data);
            

               
        })
    }

    const getUser = () =>{
        apiClient.get('/user').then((res)=>{  
            setUser(res.data);
        });
       
    }


    useEffect(()=>{
        getUser();
        getWishlist(user.id);
        

        
    },[]);
    return(

        <div>
            
            <div className="container home">
               
            {
                products.map ((product, id)=>(
                    <Suspense fallback={<Spinner/>} >
                    <CardWishList
                    key={id}
                    id ={product.id}
                    idSeller={product.userIdFK}
                    name = {product.name}
                    price =  {product.price}
                    img = {product.photos}
                    urlDetalles = {`/productDetail/${product.id}`}
                    />
                    </Suspense>
                ))
            }
            
            </div>

        </div>
    );
}
export default WishList;
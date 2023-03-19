import React, {useState, useEffect, lazy, Suspense} from "react";

//import SidebarProducts from "../../components/sidebarProducts";
//import images from "../../utilities/json-images/images";
import apiClient from "../../utils/apiClient";
import { Spinner } from 'react-bootstrap';
import { getByTestId } from "@testing-library/react";

const Card = lazy(()=>import("../../components/Card"));



function Home (){
 
    var [products , setProduts]=useState(['']);
    var [user, setUser]=useState('');
    

    const getUser = () =>{
        apiClient.get('/user').then((res)=>{  
            setUser(res.data);
        });
       
    }

    const getProducts =async() =>{
        apiClient.get('/products').then((res)=>{
            setProduts(res.data); 
            
        });
    }
    const getProduct2 = async (id) =>{
        apiClient.get('/productsWishList/'+user.id).then((res)=>{
            setProduts(res.data);
        });
    }
   
    useEffect(()=>{
        getUser();
        if(user){
            getProduct2(user.id)
        }else{
            getProducts();
        }
        
    

        
    },[]);

    return(

        <div>
            <Suspense fallback={<Spinner/>}>
            <div className="container home"> 
               
            {
                products.map ((product, id)=>(
                    
                    <Card
                    key={id}
                    id ={product.id}
                    idSeller={product.userIdFK}
                    nameSeller = {product.userFirstName}
                    name = {product.name}
                    price =  {product.price}
                    description = {product.description}
                    img = {product.photos}
                    urlDetalles = {`/productDetail/${product.id}`}
                    heart = {product.isProductInWishList}
                    />
                   
                ))
            }
            
            </div>
            </Suspense>
        </div>
    );
}
export default Home;
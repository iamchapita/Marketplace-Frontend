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
    

    

    const getProducts =async() =>{
        apiClient.get('/products').then((res)=>{
            setProduts(res.data); 
            
        });
    }
    useEffect(()=>{
        const getUser = () =>{
            apiClient.get('/user').then((res)=>{  
                setUser(res.data);
            });
           
        }
        getUser();

    }, [])
   
    useEffect(()=>{
        const getProduct2 = async (id) =>{
            apiClient.get('/productsWishList/'+user.id).then((res)=>{
                setProduts(res.data);
            });
        }
        getProduct2(user.id);
        
    

        
    },[products]);

    return(

        <div>
            
            <div className="container home"> 
               
            {
                products.map ((product, id)=>(
                    <Suspense key={id} fallback={<Spinner/>}>
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
                    heard = {Boolean(product.isProductInWishList)}
                    userId = {user.id}
                    />
                    </Suspense>
                   
                ))
            }
            
            </div>
            
        </div>
    );
}
export default Home;
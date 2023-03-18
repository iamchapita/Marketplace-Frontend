import React, {useState, useEffect, lazy, Suspense} from "react";

//import SidebarProducts from "../../components/sidebarProducts";
//import images from "../../utilities/json-images/images";
import apiClient from "../../utils/apiClient";
import { Spinner } from 'react-bootstrap';

const Card = lazy(()=>import("../../components/Card"));



function Home (){
 
    var [products , setProduts]=useState(['']);
    //var [user, setUser]=useState('');

    const getProducts =async() =>{
        apiClient.get('/products').then((res)=>{
            setProduts(res.data);
            
        })
    }
   
    useEffect(()=>{
        getProducts();
    

        
    },[]);

    return(

        <div>
            
            <div className="container home">
               
            {
                products.map ((product, id)=>(
                    <Suspense fallback={<Spinner/>}>
                    <Card
                    key={id}
                    id ={product.id}
                    idSeller={product.userIdFK}
                    name = {product.name}
                    price =  {product.price}
                    description = {product.description}
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
export default Home;
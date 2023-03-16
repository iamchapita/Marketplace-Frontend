import React, {useState, useEffect} from "react";
import Card from "../../components/Card";
//import SidebarProducts from "../../components/sidebarProducts";
//import images from "../../utilities/json-images/images";
import apiClient from "../../utils/apiClient";



function Home (){
 
    var [products , setProduts]=useState(['']);
    //var [user, setUser]=useState('');

    const getProducts =async() =>{
        apiClient.get('/products').then((res)=>{
            setProduts(res.data[0]);
            console.log(res.data[0]);
        })
    }
    const getUserName = async (id) =>{
        
    }
    useEffect(()=>{
        getProducts();

        
    },[]);
    return(

        <div>
            
            <div className="container home">
               
            {
                products.map ((product, id)=>(
                    
                    <Card
                    key={product.id}
                    id ={product.id}
                    nameSeller={getUserName}
                    idSeller={product.userIdFK}
                    name = {product.name}
                    price =  {product.price}
                    description = {product.description}
                    img = {product.photo}
                    urlDetalles = {`/productDetail/${product.id}`}
                    />
                ))
            }
            
            </div>

        </div>
    );
}
export default Home;
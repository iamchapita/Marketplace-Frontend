import React, { useState , useEffect } from "react";
import apiClient from '../../services/apiClient';

function Home(){
    const [products, setProducts] = useState('');
    useEffect( ()=>{
        getProducts()}, []);


    const getProducts = async() =>{
        const res = await apiClient('api/products');
        setProducts(res.data);
        

    }
    return(
        <div>


        <div className="card" >
        <img src="/jj" ></img>
        <div className="card-body">
            <h5 className="card-title">{products.name}</h5>
            <p className="card-text">{products.description}</p>
            <p className="card-text">{products.price}</p>
            <a href="/" className="btn btn-primary">detalles</a>
        </div>
        </div>


        </div>
    );

}
export default Home;
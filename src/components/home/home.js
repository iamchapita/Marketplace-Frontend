import React, {useEffect, useState} from "react";
import '../../style/style-home.css';
import apiClient from '../../services/apiClient';
import Card from "./card";
import Search from '../bar/search';


function Home(){

    
    const [products, setProducts] = useState([]);
    //const [filterProducts, setFilterProducts] = useState('');
    const [filter, setFilter] = useState('');

    useEffect( ()=>{
        getProducts()}, []);

    

    const getProducts = async() =>{
        const res = await apiClient('api/products');
        setProducts(res.data);
        
        
        
    }

    const filtro = async(e) =>{
        setFilter(e.target.value);
        const res = await apiClient(`api/products/${filter}`);
        var none = [];
        setProducts(none);
        setProducts(res.data);
    }
    
    return(
        <div>
            <nav className="navbar  navbar-expand-lg bg-body-tertiary  ">
                <div className="container-fluid  " >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="navbar-brand text-white" href="/productos/categoria1" >Categoria 1</a>
                        </li>
                        <li className="nav-item">
                            <a className="navbar-brand text-white" href="/productos/categoria1" >Categoria 2</a>
                        </li>
                        <li className="nav-item">
                            <a className="navbar-brand text-white" href="/productos/categoria1"  >Categoria 3</a>
                        </li>
                        <li className="nav-item">
                            <a className="navbar-brand text-white" href="/productos/categoria1" >Categoria 4</a>
                        </li>
                        

                    </ul>
                    <input className="form-control me-2" type="search" placeholder="Escriba su Busqueda"
                    value={filter} onChange={(event) => filtro(event)} />
                    <button className='btn btn-success' type="submit">Buscar</button>

                </div>

            </nav>
            { products.map ((product)=>(
            <div className="card container-card" >
                <Card
                key={product.id}
                name = {product.name}
                photo = {product.photo}
                price = {product.price}
                description = {product.description}
                id = {product.id}
                ></Card>
            </div>
            ))}

        </div>


    );

}
export default Home;
import React from "react";
import '../../style/style-home.css';
import apiClient from '../../services/apiClient';
import Card from "./card";
import Search from '../bar/search';


function Home(){

    const producto = {
            name: 'xiaomi',
            photo: '../../img-test/xiaomi.jpg',
            price : '7999',
            description : 'Es un telefono',
            id : '1'
        }
    /**  
    const [products, setProducts] = useState('');
    useEffect( ()=>{
        getproducts()}, []);


    const getProducts = async() =>{
        const res = await apiClient('api/product');
        setProducts(res.data);
        
        
        
    }
    */
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
                    <Search></Search>

                </div>

            </nav>
            <div className="card container-card" >
                <Card
                name = {producto.name}
                photo = {producto.photo}
                price = {producto.price}
                description = {producto.description}
                id = {producto.id}
                ></Card>
            </div>


            <div className="card container-card" >
                <Card
                name = {producto.name}
                photo = {producto.photo}
                price = {producto.price}
                description = {producto.description}
                id = {producto.id}
                ></Card>
            </div>


            <div className="card container-card" >
                <Card
                name = {producto.name}
                photo = {producto.photo}
                price = {producto.price}
                description = {producto.description}
                id = {producto.id}
                ></Card>
            </div>



            <div className="card container-card" >
                <Card
                name = {producto.name}
                photo = {producto.photo}
                price = {producto.price}
                description = {producto.description}
                id = {producto.id}
                ></Card>
            </div>

            <div className="card container-card" >
                <Card
                name = {producto.name}
                photo = {producto.photo}
                price = {producto.price}
                description = {producto.description}
                id = {producto.id}
                ></Card>
            </div>

            <div className="card container-card" >
                <Card
                name = {producto.name}
                photo = {producto.photo}
                price = {producto.price}
                description = {producto.description}
                id = {producto.id}
                ></Card>
            </div>

            <div className="card container-card" >
                <Card
                name = {producto.name}
                photo = {producto.photo}
                price = {producto.price}
                description = {producto.description}
                id = {producto.id}
                ></Card>
            </div>

            <div className="card container-card" >
                <Card
                name = {producto.name}
                photo = {producto.photo}
                price = {producto.price}
                description = {producto.description}
                id = {producto.id}
                ></Card>
            </div>

            <div className="card container-card" >
                <Card
                name = {producto.name}
                photo = {producto.photo}
                price = {producto.price}
                description = {producto.description}
                id = {producto.id}
                ></Card>
            </div>

            <div className="card container-card" >
                <Card
                name = {producto.name}
                photo = {producto.photo}
                price = {producto.price}
                description = {producto.description}
                id = {producto.id}
                ></Card>
            </div>

            <div className="card container-card" >
                <Card
                name = {producto.name}
                photo = {producto.photo}
                price = {producto.price}
                description = {producto.description}
                id = {producto.id}
                ></Card>
            </div>


            <div className="card container-card" >
                <Card
                name = {producto.name}
                photo = {producto.photo}
                price = {producto.price}
                description = {producto.description}
                id = {producto.id}
                ></Card>
            </div>


            

        </div>


    );

}
export default Home;
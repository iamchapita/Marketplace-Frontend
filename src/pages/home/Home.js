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
    var [images, setImages] = useState([]);


    const getImages = async (product) => {
        let arrayImages = [];
        for(let i = 0 ; i<products.length ; i++){
            await apiClient.post('/getProductImages', {
                path : products.photos[0] }).then((res)=>{
                    arrayImages.push(res.data.base64Image);
                    setImages(arrayImages);
                }).catch((error) => {
                    if (error.response.status === 401) {
                        console.log('Debe Iniciar Sesión.');
                        
                    }
                });
        }   
            
    }
    

    

    const getProducts =async() =>{
        await apiClient.get('/products').then((res)=>{
            setProduts(res.data); 
            
        }).catch((error) => {
            if (error.response.status === 401) {
                console.log('Debe Iniciar Sesión.');
                
            }
        });
    }
    const getUser = async() =>{
        await apiClient.get('/user').then((res)=>{  
            setUser(res.data);
        }).catch((error) => {
            if (error.response.status === 401) {
                console.log('Debe Iniciar Sesión.');
            }
        });
    }

    const getProduct2 = async (id) =>{
        await apiClient.get('/productsWishList/'+user.id).then((res)=>{
            setProduts(res.data);
            }).catch((error) => {
                if (error.response.status === 401) {
                    console.log('Debe Iniciar Sesión.');
                    
                }
            });
        }

    useEffect(()=>{
        getUser();
       //getProduct2(user.id);

    }, []);

    useEffect(()=>{
        
        getProduct2(user.id);
        getImages(products);
        console.log(images);
        
    }, [user]);
   

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
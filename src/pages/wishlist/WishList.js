import React, {useState, useEffect} from "react";
import CardWishList from "../../components/CardWishList";
import images from "../../utilities/json-images/images";
import apiClient from "../../utils/apiClient";


function WishList (){

    var [products , setProduts]=useState(['']);
    var [wishlist, setWishlist] = useState([]);
    var [product, setProduct] = useState();
    var listProduct =[];
    //var [user, setUser]=useState('');
 
    const getWishlist = async () =>{
        apiClient.get('/wishlist').then((res)=>{
            setWishlist(res.data);
            //console.log(wishlist);
            for (let i in wishlist){
                getProduct(wishlist[i].productIdFK);
                

            }
            console.log(listProduct);   
        })
    }

    const getProduct = async (id) =>{
        apiClient.get('/product/'+id).then((res)=>{
            setProduct(res.data[0][0]);
            //console.log(product)
        })
    }

    const getProducts =async() =>{
        apiClient.get('/products').then((res)=>{
            setProduts(res.data);
            //console.log(res.data[0]);
        })
    }
    const getUserName = async (id) =>{
        
    }
    useEffect(()=>{
        //getWishlist();
        getProducts();
        

        
    },[]);
    return(

        <div>
            
            <div className="container home">
               
            {
                products.map ((product, id)=>(
                    
                    <CardWishList
                    key={id}
                    id ={product.id}
                    idSeller={product.userIdFK}
                    name = {product.name}
                    price =  {product.price}
                    img = {product.photos}
                    urlDetalles = {`/productDetail/${product.id}`}
                    />
                ))
            }
            
            </div>

        </div>
    );
}
export default WishList;
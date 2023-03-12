import React, {useState, useEffect} from "react";
import Card from "../../components/Card";
import images from "../../utilities/json-images/images";



function Home (){

    var data = [
        {'id': '1',
        'name' : 'Huawei P30', 
        'price' : '5999', 
        'description' : 'Smartphone de alta calidad camara de 64mpx Completamente nuevo',
        'img' : images.huawei
    },
    
        {'id': '2',
        'name' : 'Iphone X', 
        'price' :'10999', 
        'description' : 'Smartphone de alta calidad camara de 64mpx Completamente nuevo',
        'img' : images.samsung
    },
    
        {'id': '2',
        'name' : 'Machete de acero', 
        'price' : '500', 
        'description' : 'machete nuevo para cortar cesped o madera',
        'img' : images.machete
    },
    
        {'id': '3',
        'name' : 'Mochila', 
        'price' : '1000', 
        'description' : 'muchilas nuevas para escuela',
        'img' : images.mochila
    },
    
        {'id': '4',
        'name' : 'Samsung s10', 
        'price' : '5999', 
        'description' : 'Smartphone de alta calidad camara de 64mpx Completamente nuevo',
        'img' : images.samsung
    }
    ];
    var [products , setProduts]=useState([]);
    console.log(images.huawei)
    useEffect(()=>{
        setProduts(data);
        //console.log(data);
        //console.log(products)
        
    },[]);
    return(

        <div>
            
            <div className="container">
            
            {
                products.map ((product)=>(
                    <Card
                    key={product.id}
                    name = {product.name}
                    price =  {product.price}
                    description = {product.description}
                    img = {product.img}
                    urlDetalles = {`/product/${product.id}`}
                    />
                ))
            }
            
            </div>

        </div>
    );
}
export default Home;
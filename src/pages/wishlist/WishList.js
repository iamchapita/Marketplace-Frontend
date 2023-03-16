import React, {useState, useEffect} from "react";
import CardWishList from "../../components/CardWishList";
import images from "../../utilities/json-images/images";



function WishList (){

    var userRegister = {'name' : 'Demsey Euceda ', 'id' : '1'};
    
    var data = [
        {'id': '1',
        'name' : 'Huawei P30', 
        'price' : '5999', 
        'description' : 'Smartphone de alta calidad camara de 64mpx Completamente nuevo',
        'img' : images.huawei,
        'user' : {name : 'Demsey Euceda', 
                  id : "1"  }
    },
    
        {'id': '2',
        'name' : 'Iphone X', 
        'price' :'10999', 
        'description' : 'Smartphone de alta calidad camara de 64mpx Completamente nuevo',
        'img' : images.samsung,
        'user' : {name : 'Demsey Euceda', 
                  id : "1"  }
    },
    
        {'id': '2',
        'name' : 'Machete de acero', 
        'price' : '500', 
        'description' : 'machete nuevo para cortar cesped o madera',
        'img' : images.machete,
        'user' : {name : 'Demsey Euceda', 
                  id : "1"  }
    },
    
        {'id': '3',
        'name' : 'Mochila', 
        'price' : '1000', 
        'description' : 'muchilas nuevas para escuela',
        'img' : images.mochila,
        'user' : {name : 'Eduardo', 
                  id : "1"  }
    },
    
        {'id': '4',
        'name' : 'Samsung s10', 
        'price' : '5999', 
        'description' : 'Smartphone de alta calidad camara de 64mpx Completamente nuevo',
        'img' : images.samsung, 
        'user' : {name : 'Alejandra Galo', 
                  id : "1"  }
        
                
    }
    ];
    var [products , setProduts]=useState([]);
    var [user, setUser]=useState('')
   // var checkValue = document.getElementById('check'+products[1].id).checked;
    //console.log(checkValue);
    //console.log(images.huawei)
    useEffect(()=>{
        setProduts(data);
        setUser(userRegister);
        
        
        //console.log(data);
        //console.log(products)
        
    },[]);
    return(

        <div>
            <div>
                <div className="container wish">
                    {
                    products.map ((product)=>(
                    <CardWishList
                    nameSeller={product.user.name}
                    idSeller={product.user.id}
                    key={product.id}
                    name = {product.name}
                    price =  {product.price}
                    description = {product.description}
                    img = {product.img}
                    urlDetalles = {`/product/${product.id}`}
                    favoriteClass = {true}
                    />
                    ))
                    }
                </div>
            </div>
        </div>
    );
}
export default WishList;
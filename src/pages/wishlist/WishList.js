import React, { useState, useEffect, lazy, Suspense } from "react";
import { Spinner } from "react-bootstrap";
import apiClient from "../../utils/apiClient";

const CardWishList = lazy(() => import("../../components/CardWishList"));


function WishList() {

    const [products, setProduts] = useState([]);
    const [user, setUser] = useState(' ');
    const [wasUserFound, setWasUserFound] = useState(null);
    const [wasWishListFound, setWasWishListFound] = useState(null);


    useEffect(() => {
        const getUser = async () => {
            const response = await apiClient.get('/user').then((res) => {
                setUser(res.data);
            }).catch((error) => {
                if (error.response.status === 401) {
                    console.log('Debe Iniciar Sesión.');
                    setWasUserFound(false);
                }
            })
        }
        getUser();
    }, []);

    useEffect(() => {
        const getWishlist = async () => {
            const response = await apiClient.post('/wishlist', { userIdFK: user.id }).then((res) => {
                setProduts(res.data);
                console.log(res.data.length)
                if(res.data.length === 0){
                    setWasWishListFound(false);
                }else(setWasWishListFound(true))
            }).catch((error) => {
                    console.log(error);
            })
        }
        getWishlist();
    }, [user]);


    if (wasUserFound === false) {
        return (
            <div className="container-sm">
                <h1 className="text-center">Debe de Iniciar Sesión</h1>
            </div>
        );
    }

    
    if (wasWishListFound === false) {
        return (
            <div className="container-sm">
                <h1 className="text-center">Aun no hay producto en la Lista de Deseos</h1>
            </div>
        );
    }

    return (

        <div>

            <div className="container home">

                {
                    products.map((product, id) => (
                        <Suspense key={id} fallback={<Spinner />} >
                            <CardWishList
                                id={product.id}
                                idSeller={product.userIdFK}
                                name={product.name}
                                price={product.price}
                                img={product.photos}
                                urlDetalles={`/productDetail/${product.id}`}
                                userId = {user.id}
                            />
                        </Suspense>
                    ))
                }

            </div>

        </div>
    );
}
export default WishList;
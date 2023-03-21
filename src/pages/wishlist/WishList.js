import React, { useState, useEffect, lazy, Suspense } from "react";
import { Spinner } from "react-bootstrap";
import apiClient from "../../utils/apiClient";

const CardWishList = lazy(() => import("../../components/CardWishList"));


function WishList() {

    const [products, setProduts] = useState([]);
    const [user, setUser] = useState(' ');

    useEffect(() => {
        const getUser = async () => {
            const response = await apiClient.get('/user').then((res) => {
                setUser(res.data);
            }).catch((error) => {
                if (error.response.status === 401) {
                    console.log('Debe Iniciar Sesión.');
                }
            })
        }
        getUser();
    }, []);

    useEffect(() => {
        const getWishlist = async () => {
            const response = await apiClient.post('/wishlist', { userIdFK: user.id }).then((res) => {
                setProduts(res.data);
            }).catch((error) => {
                console.log(error);
            })
        }
        getWishlist();

    }, [user]);

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
                            />
                        </Suspense>
                    ))
                }

            </div>

        </div>
    );
}
export default WishList;
import React, { useState, useEffect, lazy, Suspense } from "react";
import { Spinner } from "react-bootstrap";
import apiClient from "../../utils/apiClient";
import CardWishList from "../../components/CardWishList";
import CustomizableAlert from "../../components/CustomizableAlert";

const WishList = ({ isLoggedIn }) => {

    const [products, setProduts] = useState([]);
    const [wasWishListFound, setWasWishListFound] = useState(null);
    const [isReadyToRender, setIsReadyToRender] = useState(false);

    useEffect(() => {
        const getWishlist = async () => {
            const response = await apiClient.post('/wishlist', { userIdFK: localStorage.getItem('id') }).then((res) => {
                setProduts(res.data);
                setWasWishListFound(true);
                setIsReadyToRender(true);
            }).catch((error) => {
                if (error.response.status === 500) {
                    setWasWishListFound(false);
                    setIsReadyToRender(true);
                }
            })
        }
        getWishlist();
    }, []);

    if (!isReadyToRender) {
        return (
            <div className='container-fluid' style={{ marginTop: '3em' }}>
                <div className="container d-flex justify-content-center">
                    <Spinner animation="border" variant="light" />
                </div>
            </div>
        )
    }

    if (isReadyToRender) {

        if (isLoggedIn === false) {
            return (
                <CustomizableAlert title={'Error'} text={'No tienes autorización para acceder a este recurso.'}></CustomizableAlert>
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
            <div className="container wish">
                {
                    products.map((product, index) => (
                        <CardWishList
                            key={index}
                            id={product.id}
                            idSeller={product.userIdFK}
                            name={product.name}
                            price={product.price.toLocaleString()}
                            img={product.photos}
                            urlDetalles={`/productDetail/${product.id}`}
                            userId={localStorage.getItem('id')}
                        />
                    ))
                }
            </div>
        );
    }
}


export default WishList;
import React, { useState, useEffect, } from "react";
import apiClient from "../../utils/apiClient";
import { Spinner } from "react-bootstrap";
import PopularCard from "../../components/PopularCard";

const PopularProduct = ({ isLoggedIn }) => {

    const [products, setProducts] = useState(null);
    const [isReadyToRender, setIsReadyToRender] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isWhisListStatusInclude, setIsWhisListStatusInclude] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            await apiClient.get('/user/').then((response) => {
                setUserId(response.data.id);
            }).catch((error) => {
                setUserId(false);
                setIsWhisListStatusInclude(false);
            });
        }
        getUser();
    }, []);

    useEffect(() => {
        const getProducts = async () => {
                await apiClient.get('/popularProducts').then((response) => {
                    setProducts(response.data);
                    setIsWhisListStatusInclude(false);
                }).catch((error) => {
                    console.log(error);
                });
            
        }

        if (userId !== null) {
            getProducts();
        }

    }, [userId, isLoggedIn]);


    if (!isReadyToRender) {

        if (products !== null) {
            setIsReadyToRender(true);
        }

        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <div className="d-flex align-items-center justify-content-center">
                    <Spinner animation="border" variant="light" />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="container-md container-style">
                    <div className="grid-container">
                    {
                    products.map((product, index) => (
                        <PopularCard
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
                </div>
            </div>
        );
    }
}

export default PopularProduct;
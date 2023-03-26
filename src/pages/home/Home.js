import React, { useState, useEffect, } from "react";
import apiClient from "../../utils/apiClient";
import Card from "../../components/Card";
import { Spinner } from "react-bootstrap";

const Home = ({ isLoggedIn }) => {

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

        if(isLoggedIn === false) {
            setIsWhisListStatusInclude(false);
            // setUserId(false);
        }

    }, [isLoggedIn])

    useEffect(() => {
        const getProducts = async () => {
            if (!userId) {
                await apiClient.get('/products').then((response) => {
                    setProducts(response.data);
                    setIsWhisListStatusInclude(false);
                }).catch((error) => {
                    console.log(error);
                });

            } else {
                await apiClient.get(`/productsWishList/${userId}`).then((response) => {
                    setProducts(response.data);
                    setIsWhisListStatusInclude(true);
                }).catch((error) => {
                    console.log(error);
                });
            }
        }

        if (userId !== null) {
            getProducts();
        }

    }, [userId, isLoggedIn]);


    if (!isReadyToRender) {
        
        if(products !== null){
            setIsReadyToRender(true);
        }

        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <div className="d-flex align-items-center justify-content-center">
                    <Spinner animation="border" variant="light" />
                </div>
            </div>
        );
    }

    if (isWhisListStatusInclude) {
        return (
            <div className="container home">
                {
                    products.map((product, id) => (
                        <Card
                            key={id}
                            id={product.id}
                            userId={userId}
                            name={product.name}
                            price={product.price}
                            urlDetalles={`/productDetail/${product.id}`}
                            path={product.photos}
                            idSeller={product.userIdFK}
                            nameSeller={product.userFirstName + ' ' + product.userLastName}
                            isWhisListStatusInclude={true}
                            heart={product.isProductInWishList}
                        // description={product.description}
                        />
                    ))
                }
            </div>
        );
    }

    if (isWhisListStatusInclude === false) {
        return (
            <div className="container home">
                {
                    products.map((product, id) => (
                        <Card
                            key={id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            urlDetalles={`/productDetail/${product.id}`}
                            path={product.photos}
                            idSeller={product.userIdFK}
                            nameSeller={product.userFirstName + ' ' + product.userLastName}
                        // description={product.description}
                        />
                    ))
                }
            </div>
        );
    }
}
export default Home;
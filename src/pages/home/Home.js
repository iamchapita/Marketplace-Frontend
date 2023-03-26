import React, { useState, useEffect, } from "react";
import apiClient from "../../utils/apiClient";
import Card from "../../components/Card";
import LazyLoad from 'react-lazy-load';
import { Spinner } from 'react-bootstrap';

const Home = ({ isLoggedIn }) => {

    const [products, setProducts] = useState([]);
    const [isWhisListStatusInclude, setIsWhisListStatusInclude] = useState(null);

    const userId = localStorage.getItem('id');

    useEffect(() => {
        const getProducts = async () => {

            if (userId) {
                await apiClient.get(`/productsWishList/${userId}`).then((response) => {
                    setProducts(response.data);
                    setIsWhisListStatusInclude(true);
                }).catch((error) => {
                    console.log(error);
                });
            }
            if (!userId) {
                await apiClient.get('/products').then((response) => {
                    setProducts(response.data);
                    setIsWhisListStatusInclude(false);
                }).catch((error) => {
                    console.log(error);
                });
            }
        }

        getProducts();

    }, [userId]);

    const SpinnerComponent = () => (
        <div className="container-sm d-flex justify-content-center">
            <Spinner animation="border" />
        </div>
    );

    if (isWhisListStatusInclude) {
        return(
            <div>
                <LazyLoad
                    height={200}
                    offset={100}
                    placeholder={<SpinnerComponent />}
                >
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
                                    heart={Boolean(product.isProductInWishList)}
                                    // description={product.description}
                                />
                            ))
                        }
                    </div>
                </LazyLoad>
            </div>
        );
    }
    if (!isWhisListStatusInclude) {
        return(
            <div>
                <LazyLoad
                    height={200}
                    offset={100}
                    placeholder={<SpinnerComponent />}
                >
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
                </LazyLoad>
            </div>
        );
    }
}
export default Home;
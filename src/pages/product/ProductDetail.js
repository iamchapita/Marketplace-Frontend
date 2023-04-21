import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from '../../utils/apiClient';
import { Spinner } from 'react-bootstrap';
import Button from "../../components/Button";

import ShareButton from "../../components/shareButton";

const ProductDetail = ({ isAdmin, areUserStatusLoaded }) => {

    const [waitingResponse, setWaitingResponse] = useState(true);
    const [wasProductFound, setWasProductFound] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    // La variable product almacena un objeto
    const [product, setProduct] = useState([]);
    const [isBanned, setIsBanned] = useState(null);
    const [isAvailable, setIsAvailable] = useState(null);
    const [isPerformingAction, setIsPerformingAction] = useState(false);
    const [productImages, setProductImages] = useState([]);
    const [productExtensions, setProductExtensions] = useState([]);
    const [sellerDetails, setSellerDetails] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const action = async () => {
            try {
                const response = await apiClient.get(`/product/${id}`).then((productResponse) => {
                    setProduct(productResponse.data);
                    setIsAvailable(Boolean(productResponse.data.isAvailable));
                    setIsBanned(Boolean(productResponse.data.isBanned));
                    const sellerData = {
                        'id': productResponse.data.userIdFK,
                        'name': productResponse.data.userFirstName + ' ' + productResponse.data.userLastName,
                        'direction': productResponse.data.departmentName + ', ' + productResponse.data.municipalityName
                    };
                    setSellerDetails(sellerData);
                }).catch((error) => {
                    setResponseMessage(error.response.data.message);
                    setWasProductFound(false);
                    setWaitingResponse(false);
                })
            } catch (error) {
                setResponseMessage('Error');
                setWaitingResponse(false);
            }
        }
        action();
    }, [id]);

    useEffect(() => {

        if (product.length !== 0) {
            try {
                apiClient.post('/getProductImages', {
                    path: product['photos']
                }).then((response) => {
                    setProductImages(response.data);
                }).catch((error) => {
                    setResponseMessage(error.response.data.message);
                    setWasProductFound(false);
                    setWaitingResponse(false);
                });
            } catch (error) {
                setResponseMessage('Error');
                setWaitingResponse(false);
            }
        }

    }, [product]);

    useEffect(() => {
        if (productImages.length !== 0) {
            try {
                const extensions = productImages.map((productImage) => {
                    const extension = productImage.name.split('.').pop();
                    return extension;
                })
                setProductExtensions(extensions);
                setWaitingResponse(false);
            } catch (error) {
                setResponseMessage('Error');
                setWaitingResponse(false);
            }
        }
    }, [productImages]);

    const handleBanButtonAction = () => {
        setIsPerformingAction(true);

        const action = async () => {

            await apiClient.post('/setProductIsBanned', {
                id: id,
                isBanned: !isBanned
            }).then((response) => {
                setIsBanned(!isBanned);
                setIsPerformingAction(false);
            }).catch((error) => {
                console.log(error);
            });
        };
        action();
    };

    if (areUserStatusLoaded === false) {
        return (
            <div className="container-sm d-flex justify-content-center">
                <Spinner animation="border" />
            </div>
        );

    } else {

        if (waitingResponse === true) {
            return (
                <div className="container-sm d-flex justify-content-center">
                    <Spinner animation="border" />
                </div>
            );
        }

        if (wasProductFound === false) {
            return (
                <div className="container-sm">
                    <h1 className="text-center">{responseMessage}</h1>
                </div>
            );
        }

        if (waitingResponse === false) {
            return (
                <div className={`container-md container-style ${isAdmin ? (isBanned ? 'isBanned' : !isAvailable ? 'isAvailable' : '') : (null)}`} style={{ color: "white" }}>
                    <div className="row p-3">

                        <div id="carouselExampleIndicators" className="carousel carousel-dark slide" style={{ height: '60vh' }}>
                            <div className="carousel-indicators">
                                {
                                    productImages.map((image, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            data-bs-target="#carouselExampleIndicators"
                                            data-bs-slide-to={index}
                                            className={index === 0 ? 'active' : ''}
                                            aria-label={`Slide ${index}`}
                                        >
                                        </button>
                                    ))
                                }
                            </div>
                            <div className="carousel-inner">
                                {
                                    productImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`carousel-item ${index == 0 ? 'active' : ''}`}
                                        >
                                            <img
                                                src={`data:image/${productExtensions[index]};base64,${image.base64Image}`}
                                                style={{ maxHeight: '60vh' }}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev"
                                style={{ marginLeft: '3em' }}>
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next"
                                style={{ marginRight: '3em' }}>
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="row p-3">
                        <div className="col-sm-12 col-md-12 col-lg-12 productDetailText">
                            {
                                <div className="product-description">
                                    <h1>{product.name}</h1>
                                    <h4>Vendedor: <a href={`/userProfile/${sellerDetails.id}`}>{sellerDetails.name}</a></h4>
                                    <h4>Precio: L {product.price.toLocaleString()}</h4>
                                    <h4>Dirección: {sellerDetails.direction}</h4>
                                    <h4>Estado del Producto: {product.status}</h4>
                                </div>
                            }
                            {
                                isAdmin ? (
                                    isPerformingAction ? (
                                        <div>
                                            <hr></hr>
                                            <Button
                                                type={'button'}
                                                buttonClass={'danger'}
                                                tooltipText={'Espera'}
                                                diabled={!isPerformingAction}
                                                fieldLabel={
                                                    <Spinner
                                                        animation="border"
                                                        variant="light"
                                                        size="sm"
                                                    />
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <hr></hr>
                                            <Button
                                                fieldLabel={
                                                    isBanned ?
                                                        'Desbannear' :
                                                        'Bannear'
                                                }
                                                type={'button'}
                                                buttonClass={'danger'}
                                                tooltipText={
                                                    isBanned ?
                                                        'Desbanee el producto.' :
                                                        'Banee el producto.'
                                                }
                                                onClick={handleBanButtonAction}
                                            />
                                        </div>
                                    )
                                ) : (
                                    <ShareButton />
                                )
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ProductDetail;
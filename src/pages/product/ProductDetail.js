import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from '../../utils/apiClient';
import { Spinner } from 'react-bootstrap';

const ProductDetail = () => {

    const [waitingResponse, setWaitingResponse] = useState(true);
    const [wasProductFound, setWasProductFound] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    // La variable product almacena un objeto
    const [product, setProduct] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [productExtensions, setProductExtensions] = useState([]);
    const [sellerDetails, setSellerDetails] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const action = async () => {
            try {
                const response = await apiClient.get(`/product/${id}`).then((productResponse) => {
                    setProduct(productResponse.data);
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
            <div className="container-sm">
                <div className="row align-items-start">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div id="carouselExampleIndicators" className="carousel slide" style={{ height: '60vh' }}>
                            <div className="carousel-indicators">
                                {
                                    productImages.map((image, index) => (
                                        <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} aria-label={`Slide ${index}`}></button>
                                    ))
                                }
                            </div>
                            <div className="carousel-inner">
                                {
                                    productImages.map((image, index) => (
                                        <div key={index} className={`carousel-item ${index == 0 ? 'active' : ''}`}>
                                            <img src={`data:image/${productExtensions[index]};base64,${image.base64Image}`} className="d-block w-100" alt="..." style={{ objectFit: 'cover' }} />
                                        </div>
                                    ))
                                }
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="col-sm-10 col-md-10 col-lg-12 productDetailText">
                            {
                                <div>
                                    <h1>{product.name}</h1>
                                    Vendedor: <a href={`/sellerDetail/${sellerDetails.id}`}>{sellerDetails.name}</a>
                                    <h3>Precio: L {product.price}</h3>
                                    <h4>Dirección: {sellerDetails.direction}</h4>
                                    <h4>Estado del Producto: {product.status}</h4>
                                </div>
                            }
                            {
                            /* <button type="button" className="btn btn-secondary">Agregar a Lista de Deseos</button> */
                            

                            //BOTON PARA COMPARTIR 
                            
                            <button onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: product.name,
                                        text: '¡Mira este producto que encontré en la tienda en línea!',
                                        url: window.location.href
                                    }).then(() => {
                                        console.log('Gracias por compartir!');
                                    }).catch((error) => {
                                        console.error('Hubo un error al compartir', error);
                                    });
                                } else {
                                    console.log('La función share no está disponible en este dispositivo');
                                }
                            }} className="btn btn-info">Compartir</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;
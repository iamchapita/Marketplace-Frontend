import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from '../../utils/apiClient';

const ProductDetail = () => {
    const [isReadyToRender, setIsReadyToRender] = useState(false);
    // La variable product almacena un objeto
    const [product, setProduct] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [productExtensions, setProductExtensions] = useState([]);
    const [sellerDetails, setSellerDetails] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const action = () => {
            try {
                const response = apiClient.get(`/product/${id}`).then((response) => {
                    setProduct(response.data[0]);
                    setProductImages(response.data[0]['photos']);
                    apiClient.post('/sellerDetails', {
                        id: response.data[0]['userIdFK']
                    }).then((response) => {
                        setSellerDetails(response.data);
                    }).catch((error) => {
                        setIsReadyToRender(false);
                    })
                }).catch((error) => {
                    setIsReadyToRender(false);
                })
            } catch (error) {
                setIsReadyToRender(false);
            }
        }
        action();
    }, [id]);

    useEffect(() => {
        try {
            const extensions = productImages.map((productImage) => {
                const extension = productImage.name.split('.').pop();
                return extension;
            })
            setProductExtensions(extensions);
            setIsReadyToRender(true);
        } catch (error) {
            setIsReadyToRender(false);
        }
    }, [sellerDetails]);

    return (
        <div className="container-sm">
            {isReadyToRender ? (
                <div className="row align-items-start">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div id="carouselExampleIndicators" className="carousel slide" style={{ height: '60vh' }}>
                            <div className="carousel-indicators">
                                {
                                    productImages.map((image, index) => (
                                        <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? 'active':''} aria-label={`Slide ${index}`}></button>
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
                                    Vendedor: <a href="#">{sellerDetails.name}</a>
                                    <h3>L. {product.price}</h3>
                                    <h4>{sellerDetails.direction}</h4>
                                    <h4>Estado del Producto: {product.status}</h4>
                                </div>
                            }
                            <button type="button" className="btn btn-secondary">Agregar a Lista de Deseos</button>
                        </div>
                    </div>
                </div>) : (<div><h1 className="text-center">No Encontrado</h1></div>)}
        </div>
    )

}

export default ProductDetail;
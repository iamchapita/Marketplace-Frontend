import React, { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";
import { Spinner } from "react-bootstrap";

function SellerProductCard({ id, name, price, path, createdAt }) {

    const [productImage, setProductImage] = useState([]);
    const [productExtension, setProductExtension] = useState('');
    const [isReadyToRender, setIsReadyToRender] = useState(false);
    
    createdAt = createdAt.split(' ')[0];

    useEffect(() => {

        const getProductImage = async () => {
            await apiClient.post('/getProductImages', {
                path: path,
                imagesToObtain: 1
            }).then((respose) => {
                setProductImage(respose.data);
            }).catch((error) => {
                console.log(error.response.data);
            });
        }
        getProductImage();

    }, [id]);

    useEffect(() => {
        if (productImage.length !== 0) {
            try {
                const extensions = productImage.map((productImageObject) => {
                    const extension = productImageObject.name.split('.').pop();
                    return extension;
                })
                setProductExtension(extensions);
                setIsReadyToRender(true);
            } catch (error) {
                console.log(error.response.data);
            }
        }
    }, [productImage]);

    return (
        <div key={id} className="col">
            <div className="card h-100" id="seller-products">
                {!isReadyToRender ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div className="d-flex align-items-center justify-content-center">
                            <Spinner animation="border" variant="light" />
                        </div>
                    </div>
                ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div className="d-flex align-items-center justify-content-center">
                            {productImage.map((image, index) => (
                                <div key={`${id}-${index}`} className="img-card">
                                    <img key={`${id}-${index}`} src={`data:image/${productExtension[index]};base64,${image.base64Image}`} className="img-fluid w-100" />
                                </div>
                            ))}
                        </div></div>
                )}
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <h6 className="card-text">L {price.toLocaleString()}</h6>
                    <a className="card-link" href={`/productDetail/${id}`}>Detalles</a>
                </div>
                <div className="card-footer">
                    <small className="text-body-secondary">{`Publicado en: ${createdAt}`}</small>
                </div>
            </div>
        </div>
    );
}

export default SellerProductCard;
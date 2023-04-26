import React, { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";
import { Spinner } from "react-bootstrap";

function PopularCard({ id, name, price, img, urlDetalles, userId }) {

    const [favoriteClassWL, setFavoriteClassWL] = useState(true);
    const [productImage, setProductImage] = useState([]);
    const [productExtension, setProductExtension] = useState('');
    const [isReadyToRender, setIsReadyToRender] = useState(false);

    useEffect(() => {

        const getProductImage = async () => {
            await apiClient.post('/getProductImages', {
                path: img,
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
                // setResponseMessage('Error');
                console.log(error.response.data);
            }
        }
    }, [productImage]);

    return (
        <div className="container card-publication" key={id}>
            <div className="card WL-card">
                
                <div className="col-4">
                    {
                    !isReadyToRender ? (<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div className="d-flex align-items-center justify-content-center">
                            <Spinner animation="border" variant="light" />
                        </div>
                    </div>) : (productImage.map((image, index) => (
                        <div key={index} className="img-card">
                        <img src={`data:image/${productExtension[index]};base64,${image.base64Image}`} className="img-fluid" />
                        </div>
                    )))
                    }
                </div>
                
                <div className="card-body-wl">
                    <h5 className="card-title">{name}</h5>
                    <h6 className="card-text">L {price.toLocaleString()}</h6>
                    <a className="card-link" href={urlDetalles}>Detalles</a>
                </div>
            
            </div>
        </div>
    );
}


export default PopularCard;
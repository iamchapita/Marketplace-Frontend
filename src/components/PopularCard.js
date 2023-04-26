import React, { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";
import { Spinner } from "react-bootstrap";

function PopularCard({ id, userId, name, price, urlDetalles, path, idSeller, nameSeller}) {

    const [productImage, setProductImage] = useState([]);
    const [isReadyToRender, setIsReadyToRender] = useState(false);
    const [productExtension, setProductExtension] = useState('');


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
                // setResponseMessage('Error');
                console.log(error.response.data);
            }
        }
    }, [productImage]);

    return (
            <div className="container card-publication" key={id}>
                <div className="card home-card">
                    <div className="account-container">
                        <div className="count-bar">
                            <i className="material-icons icon-perfil" >person</i>
                            <a className="link-perfil" >{nameSeller}</a>
                        </div>
                    </div>
                    <div className="col-4">
                        {
                            !isReadyToRender ? (<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Spinner animation="border" variant="light" />
                                </div>
                            </div>) : (productImage.map((image, index) => (
                                <div key={index} className="img-card" >
                                    <img src={`data:image/${productExtension[index]};base64,${image.base64Image}`} className="img-fluid" />
                                </div>
                            )))
                        }
                    </div>
                    <div className="card-body home-card-body" key={id} >
                        <h5 className="card-title">{name}</h5>
                        <h6 className="card-text" >L {price.toLocaleString()}</h6>
                        <a className="card-link" href={urlDetalles}>Detalles</a>
                    </div>

                </div>
            </div>
        );
}


export default PopularCard;
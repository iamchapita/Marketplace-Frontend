import React, { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";
import { Spinner } from "react-bootstrap";

function HomeProductCard({ id, userId, name, price, urlDetalles, path, idSeller, nameSeller, heart, isWhisListStatusInclude = false }) {

    const [productImage, setProductImage] = useState([]);
    const [productExtension, setProductExtension] = useState('');
    const [favoriteClass, setFavoriteClass] = useState(heart);
    const [isReadyToRender, setIsReadyToRender] = useState(false);

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

    const favorite = async (id) => {
        setFavoriteClass(!favoriteClass);

        if (!favoriteClass) {
            await apiClient.post('/wishlistInsert', {
                productIdFK: id,
                userIdFK: userId
            }).then((res) => {
                if (res.statusText == 'OK') {
                    console.log('Aqui debe haber un alert de bootstrap que se desvanezca');
                } else {
                    alert(res.data.error);
                }
            });

        } else {

            await apiClient.post('/wishlistDelete', {
                productIdFK: id,
                userIdFK: userId
            }).then((res) => {
                if (res.statusText == 'OK') {
                    console.log('Aqui debe haber un alert de bootstrap que se desvanezca');
                } else {
                    alert(res.data.error);
                }
            });

        }
    }

    if (isWhisListStatusInclude) {
        return (
            <div className="container-home" key={id}>
                <div className="container card-publication">
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
                            <div className="check-container">
                                <label id={`labelCheck${id}`} htmlFor={`check${id}`}>
                                    <i className={`material-icons ${favoriteClass ? 'icon-favorite-active ' : 'icon-favorite'}`} >favorite
                                    </i>
                                </label>
                                <input className="check-invisible" onClick={() => favorite(id)} type="checkbox" id={`check${id}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container-home" key={id}>
                <div className="container card-publication">
                    <div className="card home-card">
                        <div className="account-container">
                            <div className="count-bar">
                                <i className="material-icons icon-perfil" >person</i>
                                <a className="link-perfil" >{nameSeller}</a>
                            </div>
                        </div>
                        <div className="col-4">
                            {
                                productImage.map((image, index) => (
                                    <img key={index} src={`data:image/${productExtension[index]};base64,${image.base64Image}`} className="img-fluid" />
                                ))
                            }
                        </div>
                        <div className="card-body home-card-body" key={id} >
                            <h5 className="card-title">{name}</h5>
                            <h6 className="card-text" >L {price.toLocaleString()}</h6>
                            <a className="card-link" href={urlDetalles}>Detalles</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeProductCard;
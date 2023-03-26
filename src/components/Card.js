import React, { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";

function Card({ id, userId, name, price, urlDetalles, path, idSeller, nameSeller, heart = null }) {

    const [productImage, setProductImage] = useState([]);
    const [productExtension, setProductExtension] = useState('');
    const [favoriteClass, setFavoriteClass] = useState(heart);

    useEffect(() => {

        const getProductImage = async () => {
            const response = await apiClient.post('/getProductImages', {
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
            } catch (error) {
                // setResponseMessage('Error');
                console.log(error.response.data);
            }
        }
    }, [productImage]);

    const favorite = async (id) => {
        let checkValue = !favoriteClass;
        setFavoriteClass(checkValue);
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

    if (heart !== null) {
        return (
            <div className="container-home">
                <div className="container card-publication">
                    <div className="card">
                        <div className="account-container">
                            <div className="count-bar">
                                <i className="material-icons icon-perfil" >person</i>
                                <a className="link-perfil" >{nameSeller}</a>
                            </div>
                        </div>
                        <div className="col-5">
                            {
                                productImage.map((image, index) => (
                                    <img key={index} src={`data:image/${productExtension[index]};base64,${image.base64Image}`} className="img-fluid" />
                                ))
                            }
                        </div>
                        <div className="card-body" key={id} >
                            <h5 className="card-title">{name}</h5>
                            <h6 className="card-text" >{price}</h6>
                            <a className="card-link" href={urlDetalles}>Detalles</a>
                            <div className="check-container">
                                <label id={`labelCheck${id}`} htmlFor={`check${id}`}>
                                    <i className={`material-icons ${favoriteClass == true ? 'icon-favorite-active ' : 'icon-favorite'}`} >favorite
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
            <div className="container-home">
                <div className="container card-publication">
                    <div className="card">
                        <div className="account-container">
                            <div className="count-bar">
                                <i className="material-icons icon-perfil" >person</i>
                                <a className="link-perfil" >{nameSeller}</a>
                            </div>
                        </div>
                        <div className="col-5">
                            {
                                productImage.map((image, index) => (
                                    <img key={index} src={`data:image/${productExtension[index]};base64,${image.base64Image}`} className="img-fluid" />
                                ))
                            }
                        </div>
                        <div className="card-body" key={id} >
                            <h5 className="card-title">{name}</h5>
                            <h6 className="card-text" >{price}</h6>
                            <a className="card-link" href={urlDetalles}>Detalles</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
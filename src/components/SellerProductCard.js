import React, { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";
import { Spinner } from "react-bootstrap";
import Button from "../components/Button";
import ProductEdit from "../pages/product/ProductEdit";
import { useNavigate } from "react-router-dom";

function SellerProductCard({ id, name, price, path, isAvailable, wasSold, isBanned, createdAt, updatedAt }) {

    const [productImage, setProductImage] = useState([]);
    const [productExtension, setProductExtension] = useState('');
    const [isReadyToRender, setIsReadyToRender] = useState(false);
    const [productWasSold, setProductWasSold] = useState(wasSold);
    const [productIsAvailable, setProductIsAvailable] = useState(isAvailable);
    const [performingWasSoldOperation, setPerformingWasSoldOperation] = useState(false);
    const [performingIsAvailableOperation, setPerformingIsAvailableOperation] = useState(false);

    createdAt = createdAt.split(' ')[0];
    updatedAt = updatedAt.split(' ')[0];
    const navigate = useNavigate();

    const handleWasSoldButton = async (productWasSold) => {

        setPerformingWasSoldOperation(true);
        const response = await apiClient.post('/setWasSoldValue', {
            id: id,
            wasSold: !productWasSold
        }).then((response) => {
            // console.log(response);
            setProductWasSold(!productWasSold);
            setPerformingWasSoldOperation(false);
        }).catch((error) => {
            console.log(error);
            setPerformingWasSoldOperation(false);
        });

    };

    const handleIsAvailableButton = async (productIsAvailable) => {
        setPerformingIsAvailableOperation(true);
        const response = await apiClient.post('/setIsAvailableValue', {
            id: id,
            isAvailable: !productIsAvailable
        }).then((response) => {
            // console.log(response);
            setProductIsAvailable(!productIsAvailable);
            setPerformingIsAvailableOperation(false);
        }).catch((error) => {
            console.log(error);
            setPerformingIsAvailableOperation(false);
        });
    };

    const handleEditProductButton = () => {
        navigate(`/productEdit/${id}`);
    }

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
            <div className={`card h-100 ${isBanned ? 'isBanned' : ''} `} id="seller-products">
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
                        </div>
                    </div>
                )}
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <h6 className="card-text">L {price.toLocaleString()}</h6>
                    {
                        !isBanned ? (
                            productIsAvailable ? (
                                !productWasSold ? (
                                    <h6 className="card-text">Estado: Disponible</h6>
                                ) : (
                                    <h6 className="card-text">Estado: Vendido</h6>
                                )
                            ) : (
                                <h6 className="card-text">Estado: Deshabilitado</h6>
                            )
                        ) : (
                            <h6 className="card-text">Estado: Banneado</h6>
                        )
                    }
                    <a className="card-link" href={`/productDetail/${id}`}>Detalles</a>
                </div>
                <div className="card-footer">
                    <div style={{ paddingBottom: '0.5em', paddingTop: '0.5em' }}>

                        <Button type={'button'} fieldLabel={'Editar producto'} buttonClass={'success'} tooltipText={'Editar campos del producto como el precio, nombre e imágenes.'} diabled={isBanned ? true : false} onClick={handleEditProductButton}/>

                    </div>
                    <div style={{ paddingBottom: '0.5em' }}>
                        {
                            performingWasSoldOperation ? (
                                <Button type={'button'} buttonClass={'info'} tooltipText={'Espera'} fieldLabel={<Spinner animation="border" variant="light" size="sm" />} />
                            ) : (
                                productWasSold ? (
                                    <Button type={'button'} fieldLabel={'Habilitar para la Venta'} buttonClass={'info'} tooltipText={'Marca el Prouducto como disponible para la venta.'} onClick={() => { handleWasSoldButton(productWasSold) }} diabled={isBanned ? true : false} />
                                ) : (
                                    <Button type={'button'} fieldLabel={'Marcar como Vendido'} buttonClass={'info'} tooltipText={'Marca el Prouducto como vendido.'} onClick={() => { handleWasSoldButton(productWasSold) }} diabled={isBanned ? true : false} />
                                )
                            )
                        }
                    </div>
                    <div style={{ paddingBottom: '0.5em' }}>
                        {
                            performingIsAvailableOperation ? (
                                <Button type={'button'} buttonClass={'danger'} tooltipText={'Espera'} fieldLabel={<Spinner animation="border" variant="light" size="sm" />} />
                            ) : (
                                productIsAvailable ? (
                                    <Button type={'button'} fieldLabel={'Deshabilitar'} buttonClass={'danger'} tooltipText={'El producto no aparece disponible para comprar.'} onClick={() => { handleIsAvailableButton(productIsAvailable) }} diabled={isBanned ? true : false} />
                                ) : (
                                    <Button type={'button'} fieldLabel={'Habilitar'} buttonClass={'danger'} tooltipText={'El producto aparece disponible para comprar.'} onClick={() => { handleIsAvailableButton(productIsAvailable) }} diabled={isBanned ? true : false} />
                                )
                            )

                        }
                    </div>
                </div>
                <div className="card-footer">
                    {
                        createdAt === updatedAt ? (
                            <small className="text-body-secondary">{`Publicado en: ${createdAt}`}</small>
                        ) : (
                            <div>
                                <small className="text-body-secondary">{`Publicado en: ${createdAt}`}</small>
                                <br></br>
                                <small className="text-body-secondary">{`Actualizado en: ${updatedAt}`}</small>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default SellerProductCard;
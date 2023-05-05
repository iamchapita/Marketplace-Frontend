import React, { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";
import { Spinner } from "react-bootstrap";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function ProductCard({ id, name, price, path, isAvailable, wasSold, isBanned, amount, createdAt, updatedAt, hasProductOwnership, isAdmin = false, complaintModule = false }) {

    const [productImage, setProductImage] = useState([]);
    const [productExtension, setProductExtension] = useState('');
    const [isReadyToRender, setIsReadyToRender] = useState(false);
    const [productWasSold, setProductWasSold] = useState(wasSold);
    const [productIsAvailable, setProductIsAvailable] = useState(isAvailable);
    const [productIsBanned, setProductIsBanned] = useState(isBanned);
    const [performingWasSoldOperation, setPerformingWasSoldOperation] = useState(false);
    const [performingIsAvailableOperation, setPerformingIsAvailableOperation] = useState(false);
    const [performingIsBannedOperation, setPerformingIsBannedOperation] = useState(false);

    const navigate = useNavigate();

    const handleWasSoldButton = async (productWasSold) => {

        setPerformingWasSoldOperation(true);
        const response = await apiClient.post('/setWasSoldValue', {
            id: id,
            wasSold: !productWasSold
        }).then((response) => {
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
            setProductIsAvailable(!productIsAvailable);
            setPerformingIsAvailableOperation(false);
        }).catch((error) => {
            console.log(error);
            setPerformingIsAvailableOperation(false);
        });
    };

    const handleIsBannedOperation = async (productIsBanned) => {
        setPerformingIsBannedOperation(true);

        await apiClient.post('/setProductIsBanned', {
            id: id,
            isBanned: !productIsBanned
        }).then((response) => {
            setProductIsBanned(!productIsBanned);
            setPerformingIsBannedOperation(false);
        }).catch((error) => {
            console.log(error);
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
        <div key={id} className="col col-sm-6 col-md-6 col-xl-3 col-xxl-3">
            <div className={`card h-100 ${isAdmin || hasProductOwnership ? (productIsBanned ? 'isBanned' : !productIsAvailable ? 'isAvailable' : '') : (' ')}`} id="seller-products">
                {
                    complaintModule ? (
                        <div className="card-header text-center pt-4">
                            <h3>Producto Denunciado</h3>
                        </div>
                    ) : (null)
                }
                <div className="paddingContainer">
                    <div className="paddingContainer">
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
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">L {price.toLocaleString()}</p>
                        {
                            hasProductOwnership ? (
                                !productIsBanned ? (
                                    productIsAvailable ? (
                                        !productWasSold ? (
                                            <p className="card-text">Estado: Disponible</p>
                                        ) : (
                                            <p className="card-text">Estado: Vendido</p>
                                        )
                                    ) : (
                                        <p className="card-text">Estado: Deshabilitado</p>
                                    )
                                ) : (
                                    <p className="card-text">Estado: Banneado</p>
                                )
                            ) : (
                                isAdmin ? (
                                    !productIsBanned ? (
                                        productIsAvailable ? (
                                            !productWasSold ? (
                                                <p className="card-text">Estado: Disponible</p>
                                            ) : (
                                                <p className="card-text">Estado: Vendido</p>
                                            )
                                        ) : (
                                            <p className="card-text">Estado: Deshabilitado</p>
                                        )
                                    ) : (
                                        <p className="card-text">Estado: Banneado</p>
                                    )
                                ) : (
                                    !productWasSold ? (
                                        <p className="card-text">Estado: Disponible</p>
                                    ) : (
                                        <p className="card-text">Estado: Vendido</p>
                                    )
                                )
                            )
                        }
                        {
                            <p className="card-text">Cantidad: {amount}</p>
                        }
                        <a className="card-link" href={`/productDetail/${id}`}>Detalles</a>
                    </div>
                </div>
                <div className="card-footer">
                    {
                        hasProductOwnership ? (
                            <div className="pt-1 pb-1">
                                <div className="pt-1 pb-1">
                                    <Button type={'button'} fieldLabel={'Editar producto'} buttonClass={'success'} tooltipText={'Editar campos del producto como el precio, nombre e imágenes.'} disabled={productIsBanned ? true : false} onClick={handleEditProductButton} />
                                </div>
                                <div className="pt-1 pb-1">
                                    {
                                        performingWasSoldOperation ? (
                                            <Button type={'button'} buttonClass={'info'} tooltipText={'Espera'} fieldLabel={<Spinner animation="border" variant="light" size="sm" />} />
                                        ) : (
                                            productWasSold ? (
                                                <Button type={'button'} fieldLabel={'Habilitar para la Venta'} buttonClass={'info'} tooltipText={'Marca el Prouducto como disponible para la venta.'} onClick={() => { handleWasSoldButton(productWasSold) }} disabled={productIsBanned ? true : false} />
                                            ) : (
                                                <Button type={'button'} fieldLabel={'Marcar como Vendido'} buttonClass={'info'} tooltipText={'Marca el Prouducto como vendido.'} onClick={() => { handleWasSoldButton(productWasSold) }} disabled={productIsBanned ? true : false} />
                                            )
                                        )
                                    }
                                </div>
                                <div className="pt-1 pb-1">
                                    {
                                        performingIsAvailableOperation ? (
                                            <Button type={'button'} buttonClass={'warning'} tooltipText={'Espera'} fieldLabel={<Spinner animation="border" variant="light" size="sm" />} />
                                        ) : (
                                            productIsAvailable ? (
                                                <Button type={'button'} fieldLabel={'Deshabilitar'} buttonClass={'warning'} tooltipText={'El producto no aparece disponible para comprar.'} onClick={() => { handleIsAvailableButton(productIsAvailable) }} disabled={productIsBanned ? true : false} />
                                            ) : (
                                                <Button type={'button'} fieldLabel={'Habilitar'} buttonClass={'warning'} tooltipText={'El producto aparece disponible para comprar.'} onClick={() => { handleIsAvailableButton(productIsAvailable) }} disabled={productIsBanned ? true : false} />
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        ) : (
                            isAdmin ? (
                                performingIsBannedOperation ? (
                                    <div className="pt-1 pb-1">
                                        <Button
                                            type={'button'}
                                            buttonClass={'danger'}
                                            tooltipText={'Espera'}
                                            disabled={!performingIsBannedOperation}
                                            onClick={() => { handleIsBannedOperation(productIsBanned) }}
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
                                    <div className="pt-1 pb-1">
                                        <Button
                                            type={'button'}
                                            buttonClass={'danger'}
                                            onClick={() => { handleIsBannedOperation(productIsBanned) }}
                                            tooltipText={
                                                productIsBanned ?
                                                    'Desbanee el producto.' :
                                                    'Banee el producto.'
                                            }
                                            fieldLabel={
                                                productIsBanned ?
                                                    'Desbannear' :
                                                    'Bannear'
                                            }
                                        />
                                    </div>
                                )
                            ) : (
                                null
                            )
                        )
                    }
                </div>
                <div className="card-footer">
                    <small className="text-body-secondary">{`Publicado en: ${new Date(createdAt).toLocaleString('es-HN', { hour12: true })}`}</small>
                    <br></br>
                    {
                        updatedAt && updatedAt !== createdAt && (
                            hasProductOwnership || isAdmin ? (
                                <small className="text-body-secondary">{`Actualizado en: ${new Date(updatedAt).toLocaleString('es-HN', { hour12: true })}`}</small>
                            ) : null
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
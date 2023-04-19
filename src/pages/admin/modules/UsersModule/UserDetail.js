import React, { useEffect } from 'react';
import { useState } from 'react';
import apiClient from '../../../../utils/apiClient';
import { Spinner } from 'react-bootstrap';
import SellerProductCard from '../../../../components/SellerProductCard';
import CustomizableAlert from '../../../../components/CustomizableAlert';
import { useParams } from 'react-router-dom';
import Button from '../../../../components/Button';

const UserDetail = ({ isLoggedIn, isAdmin, areUserStatusLoaded }) => {
    
    const [sellerInfo, setSellerInfo] = useState(null);
    const [products, setProducts] = useState([]);
    const [readyToRender, setReadyToRender] = useState(false);
    const [productsWereFound, setProductsWereFound] = useState(null);
    const [isPerformingAction, setIsPerformingAction] = useState(false);
    const [isBanned, setIsBanned] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const action = async () => {
            // Obtiene los productos del vendedor
            await apiClient.post('/getProductsBySeller', {
                sellerId: id
            }).then((response) => {
                // Se establece el arreglo de productos
                setProducts(response.data);
                setProductsWereFound(true);
            }).catch((error) => {
                if (error.response.status === 500) {

                    apiClient.post('/sellerDetails', {
                        id: id
                    }).then((response) => {
                        setSellerInfo(response.data);
                        setProductsWereFound(false);
                    }).catch(error => {
                        setSellerInfo(false);
                    })

                } else {
                    console.log(error.response.data);
                }
            });
        }
        action();

    }, []);

    useEffect(() => {

        if (areUserStatusLoaded && isLoggedIn) {
            if (productsWereFound === false) {
                const sellerInfoObject = {
                    'firstName': sellerInfo[0]['userFirstName'],
                    'lastName': sellerInfo[0]['userLastName'],
                    'email': sellerInfo[0]['userEmail'],
                    'departmentName': sellerInfo[0]['departmentName'],
                    'municipalityName': sellerInfo[0]['municipalityName']
                }
                setSellerInfo(sellerInfoObject);
                setIsBanned(sellerInfo[0]['userIsBanned']);
                setReadyToRender(true);
            }
            // Establece la informacion del usuario del tipo vendedor
            if (products.length > 0) {
                const sellerInfoObject = {
                    'firstName': products[0]['userFirstName'],
                    'lastName': products[0]['userLastName'],
                    'email': products[0]['userEmail'],
                    'departmentName': products[0]['departmentName'],
                    'municipalityName': products[0]['municipalityName']
                }
                setSellerInfo(sellerInfoObject);
                setIsBanned(products[0]['userIsBanned']);
                setReadyToRender(true);
            }
        }
        if (areUserStatusLoaded && !isLoggedIn) {
            setReadyToRender(true);
        }

    }, [productsWereFound]);

    const handleBanButtonAction = () => {
        setIsPerformingAction(true);

        const action = async () => {

            await apiClient.post('/setIsBanned', {
                id: id,
                isBanned: isBanned === 0 ? 1 : 0
            }).then((response) => {
                setIsBanned(isBanned === 0 ? 1 : 0);
                setIsPerformingAction(false);
            }).catch((error) => {
                console.log(error.response.data);
            });
        };
        action();
    };

    if (!areUserStatusLoaded) {
        return (
            <div className='container-fluid' style={{ marginTop: '3em' }}>
                <div className="container d-flex justify-content-center">
                    <Spinner animation="border" variant='light' />
                </div>
            </div>
        )
    } else {

        if (isAdmin === false) {
            return (
                <CustomizableAlert title={'Error'} text={'No tienes Autorización para acceder a este recurso.'} />
            );
        }

        if (isLoggedIn === false) {
            return (
                <CustomizableAlert title={'Error'} text={'No tienes Autorización para acceder a este recurso.'} />
            );
        }

        if (readyToRender) {

            return (
                <div className='container-fluid' style={{ marginTop: '3em' }}>
                    {
                        !readyToRender ? (
                            <div className="container d-flex justify-content-center">
                                <Spinner animation="border" />
                            </div>
                        ) : (
                            <div className='row mx-4 my-3'>
                                <div className='col-md-3'>
                                    <div className='col-md-12 container-style' style={{ color: 'white' }}>
                                        <div className={isBanned === 1 ? 'userInfoContainer isBanned' : 'userInfoContainer'} style={{ padding: '1em 1em 1em 1em', wordWrap: 'break-word' }}>
                                            <div className='userInfo'>
                                                <h4>{sellerInfo.firstName + ' ' + sellerInfo.lastName}</h4>
                                                <p>Ubicación: {sellerInfo.departmentName}, {sellerInfo.municipalityName}</p>
                                                <p>Correo Electrónico: {sellerInfo.email}</p>
                                                <hr></hr>
                                                {
                                                    isPerformingAction ? (
                                                        <Button
                                                            type={'button'}
                                                            buttonClass={'danger'}
                                                            tooltipText={'Espera'}
                                                            fieldLabel={
                                                                <Spinner
                                                                    animation="border"
                                                                    variant="light"
                                                                    size="sm"
                                                                />
                                                            }
                                                        />
                                                    ) : (
                                                        <Button
                                                            fieldLabel={
                                                                isBanned === 1 ?
                                                                    'Desbannear' :
                                                                    'Bannear'
                                                            }
                                                            type={'button'}
                                                            buttonClass={'danger'}
                                                            tooltipText={
                                                                isBanned === 1 ?
                                                                    'Desbanee el usuario.' :
                                                                    'Banee el usuario.'
                                                            }
                                                            onClick={handleBanButtonAction}
                                                        />
                                                    )
                                                }
                                            </div>
                                            <div className='userStats'>
                                                <p>Proximamente</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-9'>
                                    <div className='col-md-12 container-style'>
                                        <div className="row row-cols-1 row-cols-sm-2 row-cols-xxl-4 row-cols-xl-3 g-4">
                                            {
                                                productsWereFound ? (products.map((product, index) => (
                                                    <SellerProductCard
                                                        key={index}
                                                        id={product.id}
                                                        name={product.name}
                                                        price={product.price}
                                                        path={product.photos}
                                                        isAvailable={product.isAvailable}
                                                        amount={product.amount}
                                                        wasSold={product.wasSold}
                                                        isBanned={product.isBanned}
                                                        createdAt={product.createdAt}
                                                        updatedAt={product.updatedAt}
                                                    />
                                                ))) : (
                                                    <CustomizableAlert title={''} text={'No se han publicado Productos'} variant={'info'} />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            );
        }
    }

};

export default UserDetail;
import React, { useEffect } from 'react';
import { useState } from 'react';
import apiClient from '../../utils/apiClient';
import { Spinner } from 'react-bootstrap';
import SellerProductCard from '../../components/SellerProductCard';
import CustomizableAlert from '../../components/CustomizableAlert';

const MyProfile = ({ isLoggedIn, areUserStatusLoaded }) => {

    // Variables de estado, Se almacena la informacion a renderizar en la vista
    const [sellerInfo, setSellerInfo] = useState(null);
    const [products, setProducts] = useState([]);
    const [readyToRender, setReadyToRender] = useState(false);
    const [productsWereFound, setProductsWereFound] = useState(null);
    
    // Se ejecuta cuando se crea el componente y cuando el valor de isLoggedIn cambie
    useEffect(() => {
        const action = async () => {
            // Obtiene los productos del vendedor
            const response = await apiClient.post('/getProductsBySeller', {
                // Envia el id del usuario vendedor. Se obtiene desde localstorage.
                // Este id se guarda en el componente de login.
                sellerId: localStorage.getItem('id')
            }).then((response) => {
                // Se establece el arreglo de productos
                setProducts(response.data);
                setProductsWereFound(true);
                // setReadyToRender(true);
            }).catch((error) => {
                if (error.response.status === 500) {

                    apiClient.post('/sellerDetails', {
                        id: localStorage.getItem('id')
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

        if(areUserStatusLoaded && isLoggedIn){
            if (productsWereFound === false) {
                const sellerInfoObject = {
                    'firstName': sellerInfo[0]['userFirstName'],
                    'lastName': sellerInfo[0]['userLastName'],
                    'email': sellerInfo[0]['userEmail'],
                    'departmentName': sellerInfo[0]['departmentName'],
                    'municipalityName': sellerInfo[0]['municipalityName']
                }
                setSellerInfo(sellerInfoObject);
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
                setReadyToRender(true);
            }
        }
        if(areUserStatusLoaded && !isLoggedIn){
            setReadyToRender(true);
        }
        
    }, [productsWereFound]);

    if (!areUserStatusLoaded) {
        return (
            <div className='container-fluid' style={{ marginTop: '3em' }}>
                <div className="container d-flex justify-content-center">
                    <Spinner animation="border" variant='light' />
                </div>
            </div>
        )
    }

    if (readyToRender) {

        if (!isLoggedIn) {
            return (
                <CustomizableAlert title={'Error'} text={'No tienes Autorización para acceder a este recurso.'} />
            )
        }

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
                                <div className='col-md-12 container-style' style={{ margin: '0 0 1em 0', color: 'white' }}>
                                    <div className='userInfoContainer' style={{ padding: '1em 1em 1em 1em', wordWrap: 'break-word' }}>
                                        <div className='userInfo'>
                                            <h4>{sellerInfo.firstName + ' ' + sellerInfo.lastName}</h4>
                                            <p>Ubicación: {sellerInfo.departmentName}, {sellerInfo.municipalityName}</p>
                                            <p>Correo Electrónico: {sellerInfo.email}</p>
                                        </div>
                                        <div className='userStats'>
                                            <p>Proximamente</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-9'>
                                <div className='col-md-12 container-style'>
                                    <div className="row row-cols-1 row-cols-xxl-5 row-cols-xl-4 row-cols-md-3 row-cols-sm-2 g-4">
                                        {
                                            productsWereFound ? (products.map((product, index) => (
                                                <SellerProductCard
                                                    key={index}
                                                    id={product.id}
                                                    name={product.name}
                                                    price={product.price}
                                                    path={product.photos}
                                                    isAvailable={product.isAvailable}
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
};

export default MyProfile;
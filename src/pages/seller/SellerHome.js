import React, { useEffect } from 'react';
import { useState } from 'react';
import apiClient from '../../utils/apiClient';
import { Spinner } from 'react-bootstrap';
import SellerProductCard from '../../components/SellerProductCard';
import ErrorPage from '../../components/ErrorPage';

const SellerHome = ({ isLoggedIn, setLoggedIn, isSeller, setIsSeller }) => {

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
            }).catch((error) => {
                // Se debe renderizar un error de que no se encontro productos. PENDIENTE.
                if (error.response.status === 500) {
                    setProductsWereFound(false);
                    setReadyToRender(true);
                } else {
                    console.log(error.response.data);
                }
            });
        }
        action();

    }, []);

    useEffect(() => {
        // Establece la informacion del usuario del tipo vendedor
        if (products.length > 0) {
            const sellerInfoObject = {
                'firstName': products[0]['userFirstName'],
                'lastName': products[0]['userLastName'],
                'departmentName': products[0]['departmentName'],
                'municipalityName': products[0]['municipalityName']
            }
            setSellerInfo(sellerInfoObject);
        }

    }, [products]);

    useEffect(() => {

        if (sellerInfo !== null) {
            setReadyToRender(true);
        }

    }, [sellerInfo])

    if (!readyToRender) {
        return (
            <div className='container-fluid' style={{ marginTop: '3em' }}>
                <div className="container d-flex justify-content-center">
                    <Spinner animation="border" />
                </div>
            </div>
        )
    }

    if (!isSeller) {
        return (
            <ErrorPage title={'Error'} text={'No tienes Autorización para acceder a este recurso.'}/>
        )
    }

    if(!productsWereFound){
        return (
            <ErrorPage title={'Error'} text={'No se encontraron productos.'}/>
        )
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
                                <div className='col-md-12 container-style' style={{ margin: '0 0 1em 0' }}>
                                    <div style={{ padding: '1em 1em 1em 1em', wordWrap: 'break-word' }}>
                                        <div className='row' style={{ color: 'white' }} >Nombre: {sellerInfo.firstName + ' ' + sellerInfo.lastName}</div>
                                        <div className='row' style={{ color: 'white' }} >Ubicación</div>
                                        <div className='row' style={{ color: 'white' }} >{sellerInfo.departmentName}</div>
                                        <div className='row' style={{ color: 'white' }} >{sellerInfo.municipalityName}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-9'>
                                <div className='col-md-12 container-style'>
                                    <div className="row row-cols-1 row-cols-md-3 g-4">
                                        {
                                            products.map((product, index) => (
                                                <SellerProductCard
                                                    key={index}
                                                    id={product.id}
                                                    name={product.name}
                                                    price={product.price}
                                                    path={product.photos}
                                                    createdAt={product.createdAt}
                                                />
                                            ))
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

export default SellerHome;
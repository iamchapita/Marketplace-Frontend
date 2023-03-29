import React, { useEffect } from 'react';
import { useState } from 'react';
import apiClient from '../../utils/apiClient';
import { Spinner } from 'react-bootstrap';

const SellerHome = ({ isLoggedIn, setLoggedIn, isClient, setIsClient, isSeller, setIsSeller }) => {

    // Variables de estado, Se almacena la informacion a renderizar en la vista
    const [sellerInfo, setSellerInfo] = useState(null);
    const [products, setProducts] = useState(null);
    const [readyToRender, setReadyToRender] = useState(false);
    const [productsWereFound, setProductsWereFound] = useState(null);

    useEffect(() => {
        const action = async () => {
            const response = await apiClient.post('/getProductsBySeller', {
                sellerId: localStorage.getItem('id')
            }).then((response) => {
                setProducts(response.data);
                setProductsWereFound(true);
            }).catch((error) => {
                if(error.response.status === 500){
                    setProductsWereFound(true);
                }else{
                    console.log(error.response.data);
                }
            });
        }
        action();
    }, [isLoggedIn]);

    useEffect(() => {
    
        const sellerInfoObject = {
            'firstName': products[0]['userFirstName'],
            'lastName': products[0]['userLastName'],
            'departmentName': products[0]['departmentName'],
            'municipalityName': products[0]['municipalityName']
        }

        setSellerInfo(sellerInfoObject);
        setReadyToRender(true);

    }, [productsWereFound !== null && productsWereFound !== false])



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
                                <ul>
                                    <li>
                                        <a href='/'>Home</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-9'>
                            <div className='col-md-12 container-style'>
                                <div className="row row-cols-1 row-cols-md-3 g-4">
                                    <div className="col">
                                        <div className="card h-100">
                                            <img src="..." className="card-img-top" alt="..."></img>
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100">
                                            <img src="..." className="card-img-top" alt="..."></img>
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a short card.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100">
                                            <img src="..." className="card-img-top" alt="..."></img>
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100">
                                            <img src="..." className="card-img-top" alt="..."></img>
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default SellerHome;
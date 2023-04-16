import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import CustomizableAlert from '../../components/CustomizableAlert';
import { Spinner } from 'react-bootstrap';
import apiClient from '../../utils/apiClient';

const AdminHome = ({ isLoggedIn, isAdmin, areUserStatusLoaded }) => {

    const [isReadyToRender, setIsReadyToRender] = useState(false);
    const [usersTotal, setUsersTotal] = useState();
    const [productsTotal, setProductsTotal] = useState()

    useEffect(() => {
        const action = async () => {
            await apiClient.get('/getUsersStatistics').then((response) => {
                setUsersTotal(response.data.total);
            }).catch((error) => {
                console.log(error.response);
            });
        }
        action();
    }, [isLoggedIn = true]);

    useEffect(() => {
        const action = async () => {
            await apiClient.get('/getProductsStatistics').then((response) => {
                setProductsTotal(response.data.total);
                setIsReadyToRender(true);
            }).catch((error) => {
                console.log(error.response);
            });
        }
        action();
    }, [isLoggedIn = true]);

    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />
    }

    if (!areUserStatusLoaded) {
        return (
            <div className='container-fluid' style={{ marginTop: '3em' }}>
                <div className="container d-flex justify-content-center">
                    <Spinner animation="border" variant='light' />
                </div>
            </div>
        )
    }

    if (areUserStatusLoaded) {

        if (isAdmin === false) {
            return (
                <div>
                    <CustomizableAlert title={'Error'} text={'No tienes Autorización para acceder a este recurso.'} />
                </div>
            );
        }

        return (
            <div className='container-md container-style' style={{ color: 'black', padding: '2em' }}>
                <h1 className="text-center" style={{ color: 'white' }}>Bienvenido al Modulo de Administrador</h1>
                <h4 className="text-center" style={{ color: 'white' }}>¿Qué desea gestionar?</h4>
                {
                    !isReadyToRender ? (
                        <div className='container-fluid' style={{ marginTop: '3em' }}>
                            <div className="container d-flex justify-content-center">
                                <Spinner animation="border" variant='light' />
                            </div>
                        </div>
                    ) : (
                        <div className="row row-cols-1 row-cols-md-3 g-4 my-3">
                            <div className="col">
                                <div className="card h-100" style={{ borderColor: '#0d6efd', borderStyle: 'solid', borderWidth: '2px' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Modulo de Usuarios</h5>
                                        <p className="card-text" style={{ height: '4em' }}>Administre el acceso de los usuarios a la aplicación.</p>
                                        <a href="/usersModule" className="btn btn-primary">Ir</a>
                                    </div>
                                    <div className="card-footer text-body-secondary">{`Usuarios Registrados: ${usersTotal}`}</div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100" style={{ borderColor: '#6c757d', borderStyle: 'solid', borderWidth: '2px' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Modulo de Productos</h5>
                                        <p className="card-text" style={{ height: '4em' }}>Administre los productos que se muestran a los usuarios de la aplicación.</p>
                                        <a href="/productsModule" className="btn btn-secondary">Ir</a>
                                    </div>
                                    <div className="card-footer text-body-secondary">{`Productos Registrados: ${productsTotal}`}</div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100" style={{ borderColor: '#dc3545', borderStyle: 'solid', borderWidth: '2px' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Modulo de Denuncias</h5>
                                        <p className="card-text" style={{ height: '4em' }}>Administre las denuncias de los compradores hacia los vendedores.</p>
                                        <a href="#" className="btn btn-danger">Ir</a>
                                    </div>
                                    <div className="card-footer text-body-secondary">
                                        Denuncias Pendientes:
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100" style={{ borderColor: '#ffc107', borderStyle: 'solid', borderWidth: '2px' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Modulo de Estadística</h5>
                                        <p className="card-text" style={{ height: '4em' }}>Acceda a un resumen estadístico de las ventas, productos y usuarios de la aplicación.</p>
                                        <a href="#" className="btn btn-warning">Ir</a>
                                    </div>
                                    <div className="card-footer text-body-secondary">
                                        Métricas Disponibles:
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

export default AdminHome;
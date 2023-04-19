import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import CustomizableAlert from "../../../../components/CustomizableAlert";
import apiClient from "../../../../utils/apiClient";
import ResponsiveTable from "../../../../components/ResponsiveTable";

const UsersModule = ({ isLoggedIn, isAdmin, areUserStatusLoaded }) => {

    const [registerPerPageValue, setRegisterPerPageValue] = useState('5');
    const [isReadyToRender, setIsReadyToRender] = useState(false);
    const [dataToRender, setDataToRender] = useState(null);
    const [paginateLinks, setPaginateLinks] = useState([]);

    const operations = [{ 'name': 'Detalles', 'url': '/userDetail/' }];
    const headings = ['#', 'Nombre', 'DNI', 'Tipo de Usuario', 'Banneado', 'Estado', 'Operación'];

    useEffect(() => {

        const action = async () => {
            const randomQueryParam = Math.random().toString(36).substring(7); // generando una cadena aleatoria para el parámetro de consulta
            await apiClient.get(`/getAllUsers/${registerPerPageValue}?cache=${randomQueryParam}`).then((response) => {
                setDataToRender(response.data.data);
                setPaginateLinks(response.data.links);
                setIsReadyToRender(true);
            }).catch((error) => {
                console.log(error);
            });
        }

        action();
    }, []);


    const handleRegisterPerPageChange = (e) => {
        setRegisterPerPageValue(e.target.value);

        const action = async () => {
            setIsReadyToRender(false);
            await apiClient.get(`/getAllUsers/${e.target.value}`).then((response) => {
                setDataToRender(response.data.data);
                setPaginateLinks(response.data.links);
                setIsReadyToRender(true);
            }).catch((error) => {
                console.log(error);
            });
        }
        action();
    }

    if (!areUserStatusLoaded) {
        return (
            <div className='container-fluid' style={{ marginTop: '3em' }}>
                <div className="container d-flex justify-content-center">
                    <Spinner animation="border" variant='light' />
                </div>
            </div>
        );
    }

    if (areUserStatusLoaded) {

        if (!isLoggedIn) {
            return (
                <div>
                    <CustomizableAlert title={'Error'} text={'No tienes Autorización para acceder a este recurso.'} />
                </div>
            );
        }

        if (isAdmin) {
            return (
                <div>
                    <CustomizableAlert title={'Error'} text={'No tienes Autorización para acceder a este recurso.'} />
                </div>
            );
        }

        if (!isReadyToRender) {
            return (
                <div className='container-fluid' style={{ marginTop: '3em' }}>
                    <div className="container d-flex justify-content-center">
                        <Spinner animation="border" variant='light' />
                    </div>
                </div>
            );
        } else {
            return (
                <div className='container-md container-style' style={{ color: 'black', padding: '2em' }}>
                    <h1 className="text-center" style={{ color: 'white' }} >Módulo de Usuarios</h1>
                    <div id="registerPerPage">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                value={registerPerPageValue}
                                onChange={handleRegisterPerPageChange}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                            </select>
                            <label htmlFor="floatingSelect">Registros por Página</label>
                        </div>
                    </div>
                    <ResponsiveTable
                        headings={headings}
                        isReadyToRender={isReadyToRender}
                        setIsReadyToRender={setIsReadyToRender}
                        data={dataToRender}
                        setData={setDataToRender}
                        paginateLinks={paginateLinks}
                        setLinks={setPaginateLinks}
                        operations={operations}
                    />
                </div>
            );
        }
    }
};

export default UsersModule;
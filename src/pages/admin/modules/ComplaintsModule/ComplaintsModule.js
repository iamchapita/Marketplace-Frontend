import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import CustomizableAlert from "../../../../components/CustomizableAlert";
import apiClient from "../../../../utils/apiClient";
import ResponsiveTable from "../../../../components/ResponsiveTable";

const ComplaintsModule = ({ isLoggedIn, isAdmin, areUserStatusLoaded }) => {

    const [registerPerPageValue, setRegisterPerPageValue] = useState('5');
    const [isReadyToRender, setIsReadyToRender] = useState(false);
    const [dataToRender, setDataToRender] = useState();
    const [paginateLinks, setPaginateLinks] = useState([]);

    const operations = [{ 'name': 'Detalles', 'url': '/complaintDetail/' }];

    const headings = ['#', 'Usuario Denunciado', 'Producto Denunciado', 'Estado', 'Fecha de Denuncia', 'Fecha de Dictamen', 'Operación'];

    const action = async (value) => {
        await apiClient.get(`/getAllComplaints/${value}`).then((response) => {
            formatFields(response);
            setDataToRender(response.data.data);
            setPaginateLinks(response.data.links);
            setIsReadyToRender(true);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        action(registerPerPageValue);
    }, []);

    const formatFields = (response) => {
        response = response.data.data.map((complaint) => {
            complaint.createdAt = new Date(complaint.createdAt).toLocaleString('es-HN', { hour12: true })
        });

        return response;
    };

    const handleRegisterPerPageChange = (e) => {
        setRegisterPerPageValue(e.target.value);
        setIsReadyToRender(false);
        action(e.target.value);
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

        return (
            <div className='container-md container-style' style={{ color: 'black' }}>
                <h1 className="text-center" style={{ color: 'white' }} >Módulo de Denuncias</h1>
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
                    formartFunction={formatFields}
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
};

export default ComplaintsModule;
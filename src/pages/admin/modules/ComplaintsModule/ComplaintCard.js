import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Button from "../../../../components/Button";
import apiClient from "../../../../utils/apiClient";

function ComplaintCard({ id, description, isAwaitingResponse, wasApproved, path, createdAt, updatedAt }) {

    const [complaintImages, setComplaintImages] = useState([]);
    const [wasApprovedValue, setWasApprovedValue] = useState(wasApproved);
    const [isAwaitingResponseValue, setIsAwaitingResponse] = useState(isAwaitingResponse);
    const [isPerformingOperattion, setIsPerformingOperattion] = useState(false);
    const [isReadyToRender, setIsReadyToRender] = useState(false);

    useEffect(() => {

        const getComplaintImages = async () => {
            await apiClient.post('/getComplaintEvidences', {
                path: path
            }).then((response) => {
                setComplaintImages(response.data);
                setIsReadyToRender(true);
            }).catch((error) => {
                console.log(error.response.data);
            });
        }
        getComplaintImages();

    }, [id]);

    const handleWasApprovedValue = (wasApprovedValue) => {
        setIsPerformingOperattion(true);

        const setWasAproved = async () => {
            await apiClient.post('/setWasApproved', {
                id: id,
                wasApproved: wasApprovedValue
            }).then((response) => {
                setWasApprovedValue(wasApprovedValue);
                setIsAwaitingResponse(false);
                setIsPerformingOperattion(false);
            }).catch((error) => {
                console.log(error.response.data);
            });
        }
        setWasAproved();
    }

    if (!isReadyToRender) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="d-flex align-items-center justify-content-center">
                    <Spinner animation="border" variant="light" />
                </div>
            </div>
        );
    } else {
        return (
            <div key={id} className="col-sm-12 col-md-12 col-xl-12 col-xxl-12">
                <div className={`card h-100 ${wasApprovedValue === true ? 'isBanned' : ''}`} id="seller-products">
                    <div className="card-header text-center pt-4">
                        <h3>Detalles Denuncia</h3>
                    </div>
                    <div className="paddingContainer">
                        <div className="card-body">
                            <p className="card-text">
                                Descripción: {description}
                            </p>
                            <p className="card-text">
                                Evidencias:
                            </p>

                            <div id="carouselExampleIndicators" className="carousel carousel-dark slide"
                                style={{ height: '60vh' }}>
                                <div className="carousel-indicators">
                                    {
                                        complaintImages.map((image, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to={index}
                                                className={index === 0 ? 'active' : ''}
                                                aria-label={`Slide ${index}`}
                                            >
                                            </button>
                                        ))
                                    }
                                </div>
                                <div className="carousel-inner">
                                    {
                                        complaintImages.map((image, index) => (
                                            <div
                                                key={index}
                                                className={`carousel-item ${index == 0 ? 'active' : ''}`}
                                            >
                                                <img
                                                    src={`data:image/${image.type};base64,${image.base64Image}`}
                                                    style={{ maxHeight: '60vh' }}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="card-footer">
                        {
                            <div className="pt-1 pb-1" style={{ display: "flex" }}>
                                <div>
                                    {
                                        isPerformingOperattion ? (
                                            <Button type={'button'} buttonClass={'success'} tooltipText={'Espera'} fieldLabel={<Spinner animation="border" variant="light" size="sm" />} />
                                        ) : (
                                            <Button type={'button'} fieldLabel={'Aceptar'} buttonClass={'success'} tooltipText={'Aceptar Denuncia.'} onClick={() => { handleWasApprovedValue(true) }} disabled={isAwaitingResponseValue ? false : true} />
                                        )
                                    }
                                </div>
                                <div className="mx-2">
                                    {
                                        isPerformingOperattion ? (
                                            <Button type={'button'} buttonClass={'danger'} tooltipText={'Espera'} fieldLabel={<Spinner animation="border" variant="light" size="sm" />} />
                                        ) : (
                                            <Button type={'button'} fieldLabel={'Denegar'} buttonClass={'danger'} tooltipText={'Denegar Denuncia.'} onClick={() => { handleWasApprovedValue(false) }} disabled={isAwaitingResponseValue ? false : true} />
                                        )
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className="card-footer">
                        <small>Dictamen: {typeof (wasApprovedValue) === "string" ? wasApprovedValue : (wasApprovedValue ? 'Denuncia Aceptada' : 'Denuncia Denegada')}</small>
                    </div>
                    <div className="card-footer">
                        <small className="text-body-secondary">{`Realizada en: ${new Date(createdAt).toLocaleString('es-HN', { hour12: true })}`}</small>
                        <br></br>
                        {
                            updatedAt !== null && updatedAt !== createdAt ? (
                                <small className="text-body-secondary">{`Dictaminada en: ${new Date(updatedAt).toLocaleString('es-HN', { hour12: true })}`}</small>
                            ) : (
                                null
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ComplaintCard;
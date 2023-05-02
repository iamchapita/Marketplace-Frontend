import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Button from "../../../../components/Button";
import apiClient from "../../../../utils/apiClient";
import CustomizableAlert from "../../../../components/CustomizableAlert";

function ComplaintCard({ id, description, isAwaitingResponse, wasApproved, path, createdAt, updatedAt, isAdmin = false }) {

    const [complaintImages, setComplaintImages] = useState([]);
    const [isReadyToRender, setIsReadyToRender] = useState(false);

    useEffect(() => {

        const getComplaintImages = async () => {
            await apiClient.post('/getComplaintEvidences', {
                path: path
            }).then((respose) => {
                setComplaintImages(respose.data);
                setIsReadyToRender(true);
            }).catch((error) => {
                console.log(error.response.data);
            });
        }
        getComplaintImages();

    }, [id]);

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
            <div key={id} className="col">
                <div className="card h-100" id="seller-products">
                    <div className="card-header text-center pt-4">
                        <h3>Detalles Denuncia</h3>
                    </div>
                    <div className="paddingContainer">
                        <div className="card-body">
                        </div>
                    </div>
                    <div className="card-footer">
                        <small className="text-body-secondary">{`Publicado en: ${new Date(createdAt).toLocaleString('es-HN', { hour12: true })}`}}</small>
                        <br></br>
                        {
                            updatedAt !== null && updatedAt !== createdAt ? (
                                <small className="text-body-secondary">{`Actualizado en: ${new Date(updatedAt).toLocaleString('es-HN', { hour12: true })}`}}</small>
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
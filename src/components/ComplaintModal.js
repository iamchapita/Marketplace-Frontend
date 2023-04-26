import React, { useState, useEffect } from "react";
import { Modal, Spinner } from 'react-bootstrap';
import apiClient from '../utils/apiClient';
import TextArea from "../components/TextArea";
import InputFile from "../components/InputFile";
import Alert from "../components/common/Alert";
import Button from "./Button";

const ComplaintModal = ({ sellerDetails, productDetails, complaintSent, setComplaintSent, showModal, setShowModal, isPerformingAction, setIsPerformingAction }) => {

    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [description, setDescription] = useState("");
    const [isDescriptionValid, setIsDescriptionValid] = useState(false);
    const [evidences, setEvidences] = useState([]);
    const [areEvidencesValid, setAreEvidencesValid] = useState(false);
    const [evidencesConvertered, setEvidencesConvertered] = useState([]);
    const [alertType, setAlertType] = useState('danger');
    const [strongTextAlert, setStrongTextAlert] = useState('Ups!');

    let validationMessages = "";

    const descriptionRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d\-_.,;:()"'!]{15,250}$/;

    useEffect(() => {

        if (complaintSent === true) {
            setComplaintSent(true);
            setAlertType('danger');
            setStrongTextAlert('Ups!');
            setAlertMessage('Ya has denunciado este cliente.');
            setIsDescriptionValid(true);
            setShowAlert(true);
        }

    }, [complaintSent])

    useEffect(() => {

        let evidencesConverteredArray = [];

        evidences.map((evidence) => {
            const reader = new FileReader();
            reader.readAsDataURL(evidence);

            reader.onload = () => {
                const base64String = ((reader.result).split(';')[1]).split(',')[1];
                let evidenceData = { 'name': evidence.name, 'base64Image': base64String };
                evidencesConverteredArray.push(evidenceData);
            }
        });

        setEvidencesConvertered(evidencesConverteredArray);
        setAreEvidencesValid(true);
    }, [evidences]);

    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value);
        descriptionRegex.test(e.target.value) ? setIsDescriptionValid(true) : setIsDescriptionValid(false);
    }

    const evidencesChangeHandler = (e) => {
        const filesArray = Array.from(e.target.files);
        setEvidences(filesArray);
    }

    const handleCloseModal = () => setShowModal(false);

    const validateFields = () => {

        !descriptionRegex.test(description) ? validationMessages = validationMessages + '<br>El contenido del campo Descripción no es válido.' : validationMessages = validationMessages + '';

        evidences.map((evidence) => {
            const fileType = String(evidence.type).split('/')[0];

            if (fileType !== 'image') {

                !validationMessages.includes('tipo imagen') ? validationMessages = validationMessages + '<br>Los archivos cargados no son del tipo imagen.' : validationMessages = validationMessages + '';
                setAreEvidencesValid(false);
            }
        });

        evidences.length > 6 ? validationMessages = validationMessages + '<br>Solamente se pueden subir 6 imágenes por producto.' : validationMessages = validationMessages + '';

        evidences.length === 0 ? validationMessages = validationMessages + '<br>No se ha seleccionado ningún archivo.' : validationMessages = validationMessages + '';

    }

    const submitHandler = (e) => {
        e.preventDefault();

        validateFields();

        if (validationMessages.length > 0) {
            setAlertMessage(validationMessages);
            setShowAlert(true);
        } else {
            setShowAlert(false);
            setIsPerformingAction(true);
            const action = async () => {
                await apiClient.post('/createComplaint', {
                    userIdFK: localStorage.getItem('id'),
                    userIdReported: sellerDetails.id,
                    productIdFK: productDetails.id,
                    description: description,
                    evidences: evidencesConvertered
                }).then((response) => {
                    setComplaintSent(true);
                    setAlertType('info');
                    setStrongTextAlert('¡Completado!');
                    setAlertMessage('Denuncia Enviada.');
                    setShowAlert(true);
                    setIsPerformingAction(false);
                }).catch((error) => {

                });
            }

            action();
        }
    }

    return (
        <Modal show={showModal} onHide={handleCloseModal} size="xl" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Enviar Denuncia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form encType='multipart/form-data' className='formulario'>
                    <Alert text={alertMessage} showAlert={showAlert} setShowAlert={setShowAlert} type={alertType} strongText={strongTextAlert} />

                    <div className="input-group mb-3">
                        <label className='input-group-text'>Vendedor</label>
                        <select className='form-control' disabled>
                            <option value="">{sellerDetails.name}</option>
                        </select>
                    </div>

                    <TextArea fieldLabel={'Descripción'} fieldName={'description'} placeholder={'Brinde una descripción de lo que denuncia.'} inputValue={description} onChangeHandler={descriptionChangeHandler} isValid={isDescriptionValid} disabled={complaintSent} />

                    <InputFile type={'file'} fieldLabel={'Evidencias'} fieldName={'evidences'} placeholder={'Suba fotografías del Producto'} inputValue={evidences} onChangeHandler={evidencesChangeHandler} required={true} disabled={complaintSent} isValid={areEvidencesValid} accept={['image/*']} />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type={"button"}
                    buttonClass={"secondary"}
                    fieldLabel={"Cerrar"}
                    onClick={() => { handleCloseModal() }}
                />
                {
                    isPerformingAction ? (
                        <Button
                            type={'button'}
                            buttonClass={'danger'}
                            tooltipText={'Espera'}
                            disabled={!isPerformingAction}
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
                            type={"button"}
                            buttonClass={"danger"}
                            fieldLabel={"Enviar Denuncia"}
                            tooltipText={'Envía la denuncia para posterior revisión por parte de la administración.'}
                            onClick={submitHandler}
                            disabled={true}
                        />
                    )
                }
            </Modal.Footer>
        </Modal>
    );
}

export default ComplaintModal;
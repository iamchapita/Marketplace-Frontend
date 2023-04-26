import React, { useState, useEffect } from "react";
import apiClient from '../utils/apiClient';
import TextArea from "../components/TextArea";
import InputFile from "../components/InputFile";
import Alert from "../components/common/Alert";


const ComplaintForm = ({ sellerDetails, productDetails, productImages, productExtensions }) => {

    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [description, setDescription] = useState("");
    const [isDescriptionValid, setIsDescriptionValid] = useState(false);
    const [evidences, setEvidences] = useState([]);
    const [areEvidencesValid, setAreEvidencesValid] = useState(false);
    const [evidencesConvertered, setEvidencesConvertered] = useState([]);

    let validationMessages = "";

    const descriptionRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d\-_.,;:()"'!]{0,250}$/;

    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value);
        descriptionRegex.test(e.target.value) ? setIsDescriptionValid(true) : setIsDescriptionValid(false);
    }

    const evidencesChangeHandler = (e) => {
        const filesArray = Array.from(e.target.files);
        setEvidences(filesArray);
    }

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

    return (
        <div>
            <form encType='multipart/form-data' className='formulario'>
                <Alert text={alertMessage} showAlert={showAlert} setShowAlert={setShowAlert} />

                <TextArea fieldLabel={'Descripción'} fieldName={'description'} placeholder={'Brinde una descripción de lo que denuncia.'} inputValue={description} onChangeHandler={descriptionChangeHandler} isValid={isDescriptionValid} />

                <InputFile type={'file'} fieldLabel={'Evidencias'} fieldName={'evidences'} placeholder={'Suba fotografías del Producto'} inputValue={evidences} onChangeHandler={evidencesChangeHandler} required={true} isValid={areEvidencesValid} accept={['image/*']} />
            </form>
        </div>
    );
}

export default ComplaintForm;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiClient from '../../utils/apiClient';
import InputText from '../../components/InputText';
import Button from '../../components/Button';
import Alert from '../../components/common/Alert';


const Login = ({ isLoggedIn, setLoggedIn }) => {

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const navigate = useNavigate();

    // Declarando expresiones regulares a usarse para la validacion de campos
    const emailRegex = /[a-z0-9_-]+(?:\.[a-z0-9-_]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-záéíóúüñ])(?=.*[A-ZÁÉÍÓÚÜÑ])(?=.*[^\w\sáéíóúüñÁÉÍÓÚÜÑ]).{8,35}$/;

    //  Variable que almacena el mensaje de error retornado en el Alert
    let validationMessages = '';

    const handleEmailChange = (e) => {
        setEmailValue(e.target.value);
        // Estableciendo el valor de isEmailValid dependiendo el estado de la validacion del campo
        emailRegex.test(e.target.value) ? setIsEmailValid(true) : setIsEmailValid(false);
    }

    const handlePasswordChange = (e) => {
        setPasswordValue(e.target.value);
        // Estableciendo el valor de isPasswordValid dependiendo el estado de la validacion del campo
        passwordRegex.test(e.target.value) ? setIsPasswordValid(true) : setIsPasswordValid(false);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (!emailRegex.test(emailValue)) {
            validationMessages = '<p>El correo Electrónico es inválido.</p>';
        }

        if (!passwordRegex.test(passwordValue)) {
            validationMessages = validationMessages + '<p>Contraseña debe tener:<br>- 8 caractéres mínimo y 35 caractéres máximo.<br>- Al menos 1 letra minúscula.<br>- Al menos 1 letra mayúscula.<br>- Al menos un número.</p>'
        }

        // Se comprueba si hay mensajes de error
        if (validationMessages.length > 1) {
            setAlertMessage(validationMessages);
            setShowAlert(true);
        }
        else {
            // Peticion Axios
            const action = async () => {
                try {
                    const response = await apiClient.post('/login', {
                        email: emailValue,
                        password: passwordValue
                    }).then((response) => {
                        if (response.status === 200) {
                            setLoggedIn(true);
                            // Redireccionando a la ruta base
                            navigate('/');
                        }
                    }).catch((error) => {
                        setShowAlert(true);
                        setAlertMessage(error.response.data.message);
                    })
                } catch (error) {

                }
            }

            action();
        }
    }

    return (
        <div className='container-lg'>
            <br></br>
            <div className='container-sm'>
                <div className='tittle'>

                    <h1>Inicio de Sesión</h1>

                </div>
                <div className='row'>
                    <div className='col'>
                        <img src={process.env.PUBLIC_URL + '/Isotipo sin fondo.png'} alt="Descripción de la imagen" />
                    </div>
                    <div className='col'>
                        <form encType='multipart/form-data'>
                            <Alert text={alertMessage} showAlert={showAlert} setShowAlert={setShowAlert} />
                            <InputText type={'email'} fieldLabel={'Correo Electrónico'} fieldName={'email'} placeholder={'micorreo@dominio.com'} inputValue={emailValue} required={true} isValid={isEmailValid} onChangeHandler={handleEmailChange} />
                            <InputText type={'password'} fieldLabel={'Contraseña'} fieldName={'password'} invalid={isPasswordValid} placeholder={'Contraseña de entre 8 y 35 caractéres'} inputValue={passwordValue} required={true} isValid={isPasswordValid} onChangeHandler={handlePasswordChange} />
                            <Button type={'submit'} fieldLabel={'Iniciar Sesión'} onClick={submitHandler} />
                        </form>
                    </div>
                </div>
                <br></br>
            </div>
            <br></br>
        </div>
    );

}
export default Login;
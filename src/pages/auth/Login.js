import React from 'react';
import { useEffect, useState } from 'react';
import apiClient from '../../utils/apiClient';
import InputText from '../../components/InputText';
import Button from '../../components/Button';


const Login = ({ isLoggedIn, setLoggedIn }) => {

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleEmailChange = (e) => {
        setEmailValue(e.target.value);
    }
    
    const handlePasswordChange = (e) => {
        setPasswordValue(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const action = async () => {
            try {
                const response = await apiClient.post('/login', {
                    email: emailValue,
                    password: passwordValue
                }).then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        setLoggedIn(true)
                    } else {
                        setLoggedIn(false);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            } catch (error) {
                console.error(error);
            }
        }
        
        action();

    }

    return (
        <form encType='multipart/form-data'>
            <InputText type={'email'} fieldLabel={'Correo Electrónico'} fieldName={'email'} placeholder={'micorreo@dominio.com'} inputValue={emailValue} required={true} onChangeHandler={handleEmailChange} />
            
            <InputText type={'password'} fieldLabel={'Contraseña'} fieldName={'password'} placeholder={'Contraseña de entre 8 y 35 caractéres'} inputValue={passwordValue} required={true} onChangeHandler={handlePasswordChange} />
            <Button type={'submit'} fieldName={'Iniciar Sesión'} onClick={submitHandler}/>
        </form>
    );

}
export default Login;
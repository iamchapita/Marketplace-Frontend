import React, { useState } from 'react';
import apiClient from '../../services/apiClient';
import '../../style/style-login.css';
import Alert from '../alert';


const Login = ({ loggedIn, setLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    // Limpieza de los campos del formulario
    const clearFields = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Comprobacion de campos correo electronico y contraseña

        if (!validateEmail(email) || !validatePassword(password)) {
            setShowAlert(true);
            clearFields();
            return
        } else {
            // Envio de las credenciales al backend
            apiClient.post('api/login', {
                email: email,
                password: password
            }).then((response) => {

                // Si las credenciales enviadas existen en la BD y son 
                // las correctas
                if (response === true) {
                    setLoggedIn(true);
                    // Pendiente redireccion a la vista necesaria

                    // Si las credenciales no son las correctas
                } else {
                    setLoggedIn(false);
                    setShowAlert(true);
                    clearFields();
                }
            });
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /(^[^\s@]+@[^\s@]+\.[^\s@]+$)/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,35}$)/;
        return passwordRegex.test(password);
    };

    return (
        <div className='box-login'>
            <div className='card-body-login'>
                <form onSubmit={handleSubmit}>
                    <h2>Iniciar Sesion</h2>
                    <Alert text={'Credenciales Incorrectas.'} showAlert={showAlert} setShowAlert={setShowAlert} />
                    <div className='mb-3'>
                        <label className='form-label'>Correo Electrónico</label>
                        <input className='form-control' name='email' type='emailHelp' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off' />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' >Contraseña</label>
                        <input className='form-control' name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off' />
                    </div>
                    <div className='mb-2'>
                        <button className='btn btn-success' type='submit' >Iniciar Sesión</button>
                    </div>
                    <div className='text-wrd'>
                        <p >¿No tienes cuenta?</p>
                        <a className='text-link' href='/registro'>Registrate</a>
                    </div>
                </form>
            </div>
        </div>
    );

}
export default Login;
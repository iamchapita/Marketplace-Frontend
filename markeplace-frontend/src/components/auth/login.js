import React, { useState } from 'react';
import apiClient from '../../services/apiClient';
import '../../style/style-login.css';
import Alert from '../alert';


const Login = ({ loggedIn, setLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient.post('api/login', {
            email: email,
            password: password
        }).then((response) => {

            // Si las credenciale son correctas
            if (response === true) {
                setLoggedIn(true);
                // Redirigir a vista 

            // Si las credenciales son incorrectas
            } else {
                setLoggedIn(false);
                setShowAlert(true);
            }
        });
    };

    return (
        <div className='box-login'>
            <div className='card-body-login'>
                <form onSubmit={handleSubmit}>
                    <h2>Iniciar Sesion</h2>
                    <Alert text={'Credenciales Incorrectas.'} showAlert={showAlert} setShowAlert={setShowAlert}/>
                    <div className='mb-3'>
                        <label className='form-label'>Correo Electrónico</label>
                        <input className='form-control' name='email' type='emailHelp' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' >Contraseña</label>
                        <input className='form-control' name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
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
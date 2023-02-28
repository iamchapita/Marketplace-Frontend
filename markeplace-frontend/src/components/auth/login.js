import React, { useState } from 'react';
//import axios from 'axios';
import apiClient from '../../services/apiClient';
import '../../style/style-login.css'



const Login = ({ login }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient.post('api/login', {
            email: email,
            password: password
        }).then((response) => {
            console.log(response);
        })
    };

    return (
        <div className='box'>
            <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <h2>Iniciar Sesion</h2>
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
                    </form>
            </div>
        </div>
    );

}
export default Login;
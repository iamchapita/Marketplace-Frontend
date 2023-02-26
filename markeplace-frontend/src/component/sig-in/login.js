import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login',{
            email: email,
            password: password
        }).then((response) => {
            console.log(response);
        });
    }

    return (

        <div className='container'>
            <div className='card-body'>
                <form onSubmit={handleSubmit}>
                    <h2>Iniciar Sesion</h2>
                    <br></br>
                    <div className='mb-3'>
                        <label className='form-label'>Correo Electrónico</label>
                        <input className='form-control' name='email' type='emailHelp' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' >Contraseña</label>
                        <input className='form-control' name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <br></br>
                    <div className='mb-2'>
                        <button className='btn btn-primary' type='submit' >Iniciar Sesión</button>
                    </div>
                </form>
            </div>
        </div>
    );

}
export default Login;
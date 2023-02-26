import React, { useState } from 'react';
import apiClient from '../../services/apiClient';

function RegistrationPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [address, setAddress] = useState('');
    const [dni, setDni] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        
        apiClient.post('api/register', {
            // Este sera el orden de los parametros en
            // el objeto request y en la funcion validator
            // en el backend
            firstName: name,
            lastName: name,
            email: email,
            dni: dni,
            phoneNumber: phoneNumber,
            birthDate: birthDate,
            password: password
        }).then(response => {
            console.log(response.data);
        })
        
    };

    return (
        <div>
            <div className='card'>
                <div className='card-body' >
                    <h2>Registro</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre completo</label>
                            <input className='form-control' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Correo electronico</label>
                            <input className='form-control' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>DNI</label>
                            <input className='form-control' type="text" value={dni} onChange={(e) => setDni(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Número de teléfono</label>
                            <input className='form-control' type="tel" value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Dirección</label>
                            <input className='form-control' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Contraseña</label>
                            <input className='form-control' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Fecha de Nacimiento</label>
                            <input className='form-control' type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                        </div>
                        <button className='btn btn-primary' type="submit">Registrarse</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default RegistrationPage;
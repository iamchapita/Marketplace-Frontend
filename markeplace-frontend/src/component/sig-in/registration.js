import React, { useState } from 'react';


function RegistrationPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState('');
    const [identification, setIdentification] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login logic
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
                            <input className='form-control' type="text" value={identification} onChange={(e) => setIdentification(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Número de teléfono</label>
                            <input className='form-control' type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
                            <input className='form-control' type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                        </div>
                        <button className='btn btn-primary' type="submit">Registrarse</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default RegistrationPage;
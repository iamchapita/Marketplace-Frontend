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
                <label className='form-label'>
                    Nombre completo:
                    <input className='form-control' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </label>
                  <br />
                  </div>
                  <div className='mb-3'>
                    <label>
                      Correo electronico:
                      <input className='form-control' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <br />
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>
                      DNI:
                      <input className='form-control' type="text" value={identification} onChange={(e) => setIdentification(e.target.value)} />
                    </label>
                    <br />
                  </div>
                  <label className='form-label'>
                    Numero:
                    <input className='form-control' type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </label>
                  <br />
                  
                  <label className='form-label'>
                    Direccion:
                    <input className='form-control' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </label>
                  <br />

                  <label className='form-label'>
                    Contraseña:
                    <input className='form-control' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </label>
                  <br />

                  <label className='form-label'>
                    Fecha de Nacimiento:
                    <input className='form-control' type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                  </label>
                  <br />
                  <label></label>
                  <button className='btn btn-primary' type="submit">Registrarse</button>
                </form>
          </div>
        </div>
      </div>
    
  );
}

export default RegistrationPage;
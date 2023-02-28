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
    };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Nombre completo:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
      
        <label>
          Correo electronico:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />

        <label>
          DNI:
          <input type="text" value={identification} onChange={(e) => setIdentification(e.target.value)} />
        </label>
        <br />
      
        <label>
          Numero:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />
        
        <label>
          Direccion:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <br />

        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />

        <label>
          Fecha de Nacimiento:
          <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
        </label>
        <br />
        <label></label>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
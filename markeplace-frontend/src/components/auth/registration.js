import React, { useEffect, useState } from 'react';
import apiClient from '../../services/apiClient';
import UserAgreement from './useragreement';
import '../../style/style-registration.css'


function RegistrationPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [addressDepartment, setAddressDepartment] = useState('');
    const [addressMunicipality, setAddressMunicipality] = useState('');
    const [dni, setDni] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);

    useEffect(() => {
        apiClient.get('api/departments').then((response) => {
            setDepartments(response.data);
        })
    }, []);

    useEffect(() => {
        apiClient.get('api/municipalities').then((response) => {
            setMunicipalities(response.data);
        })
    }, []);

    const handleChange = (e) => {
        setAddressDepartment(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        apiClient.post('api/register', {
            // Este sera el orden de los parametros en
            // el objeto request y en la funcion validator
            // en el backend
            firstName: name,
            lastName: lastName,
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
            <div className='box-registration'>
                <div className='card-body-registration' >
                    <h2>Registro</h2>
                    <p></p>
                    <form onSubmit={handleSubmit} className='row'>

                        <div className='col-6'>
                            <label className='form-label'>Nombres</label>
                            <input
                                className='form-control'
                                type="text"
                                value={name}
                                id="name"
                                name="name"
                                required
                                pattern='/([\w \,\+\-\/\#\$\(\)]+)/'
                                maxlength="45"
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className='col-6'>
                            <label className='form-label'>Apellidos</label>
                            <input
                                className='form-control'
                                type="text"
                                value={lastName}
                                id="lastName"
                                name="lastName"
                                required
                                pattern='/([\w \,\+\-\/\#\$\(\)]+)/'
                                maxlength="45"
                                onChange={(e) => setLastName(e.target.value)} />
                        </div>

                        <div><p></p></div>

                        <div className='col-md-4'>
                            <label className='form-label'>DNI</label>
                            <input
                                className='form-control'
                                type="text"
                                value={dni}
                                pattern="[0-9]+{4}\-[0-9]+{4}\- [0-9]+{5}"
                                required
                                onChange={(e) => setDni(e.target.value)} />
                        </div>

                        <div className='col-md-4'>
                            <label className='form-label'>Teléfono</label>
                            <input className='form-control'
                                type="number"
                                value={phoneNumber}
                                pattern="[0-9]+{4}\-[0-9]+{4}"
                                required
                                onChange={(e) => setphoneNumber(e.target.value)} />
                        </div>

                        <div className='col-md-4'>
                            <label className='form-label'>Fecha de Nacimiento</label>
                            <input className='form-control'
                                type="date"
                                value={birthDate}
                                required
                                onChange={(e) => setBirthDate(e.target.value)} />
                        </div>

                        <div><p></p></div>

                        <div className='col-6'>
                            <label className='form-label'>Departamento</label>
                            <select className='form-select'
                                type="list"
                                value={addressDepartment}
                                required
                                onChange={handleChange}>
                                <option value="">Seleccione un Departamento</option>
                                {departments.map((department) => (
                                    <option key={department.id} value={department.id}>{department.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className='col-6'>
                            <label className='form-label'>Municipio</label>
                            <select
                                className='form-select'
                                type="list"
                                value={addressMunicipality}
                                required
                                onChange={(e) => setAddressMunicipality(e.target.value)}>
                                <option value="">Seleccione un Municipio</option>
                                {municipalities.map((municipality) => (
                                    <option hidden={municipality.departmentIdFK != addressDepartment} key={municipality.id} value={municipality.id}>{municipality.name}</option>
                                ))}
                            </select>
                        </div>

                        <div><p></p></div>

                        <div className='mb-3'>
                            <label className='form-label'>Correo electronico</label>
                            <input
                                className='form-control'
                                type="email"
                                value={email}
                                required
                                maxlength="50"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Contraseña</label>
                            <input
                                className='form-control'
                                type="password"
                                value={password}
                                required
                                maxlength="50"
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className='agreements'>
                            <UserAgreement isDisabled={isDisabled} setIsDisabled={setIsDisabled}></UserAgreement>
                        </div>

                        <div>
                            <button className='btn btn-success' type="submit" disabled={!isDisabled} >Registrarse</button>
                            <div className='text-wrd'>
                                <p className=''>¿Ya tienes cuenta?</p>
                                <a className='text-link' href='/login' >Inicia Sesión</a>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>

    );
}

export default RegistrationPage;
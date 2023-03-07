import React, { useEffect, useState } from 'react';
import apiClient from '../../utils/apiClient';
import Button from '../../components/Button';
import InputText from '../../components/InputText';
import Date from '../../components/Date';
import Checkbox from '../../components/Checkbox';
import Agreement from '../../pages/auth/Agreement';



const UserRegitration = () => {
    const [firtsName, setFirtsName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [addressDepartment, setAddressDepartment] = useState('');
    const [addressMunicipality, setAddressMunicipality] = useState('');
    const [departments, setDepartments] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [isAccepted, setIsAccepted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Obtencion de Departamentos para el select de Dirección
    useEffect(() => {
        const action = async () => {
            try {
                const response = await apiClient.get('/departments').then((response) => {
                    setDepartments(response.data);
                }).catch((error) => {
                    console.log(error);
                })
            } catch (error) {
            }
        }

        action();
    }, [])

    // Obtencion de Municipios para el select de Dirección
    useEffect(() => {
        const action = async () => {
            try {
                const response = await apiClient.get('/municipalities', {
                }).then((response) => {
                    setMunicipalities(response.data);
                }).catch((error) => {
                    console.log(error);
                })
            } catch (error) {
            }
        }

        action();
    }, []);


    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleFirtsNameValueChange = (e) => {
        setFirtsName(e.target.value);
    };
    const handleLastNameValueChange = (e) => {
        setLastName(e.target.value);
    };
    const handleDniValueChange = (e) => {
        setDni(e.target.value);
    };
    const handleEmailValueChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePhoneNumberValueChange = (e) => {
        setPhoneNumber(e.target.value);
    };
    const handleBirthDateValueChange = (e) => {
        setBirthDate(e.target.value);
    };
    const handlePasswordValueChange = (e) => {
        setPassword(e.target.value);
    };
    const handlePasswordConfirmationValueChange = (e) => {
        setPasswordConfirmation(e.target.value);
    };
    const handleAddressDepartmentValueChange = (e) => {
        setAddressDepartment(e.target.value);
    };
    const handleAddressMunicipalityValueChange = (e) => {
        setAddressMunicipality(e.target.value);
    };
    const handleIsAcceptedValueChange = (e) => {
        setIsAccepted(e.target.value);
    };

    //Se crea una funcion con las validaciones
    const isEmailValid=(email)=>{
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const isNameValid=(name)=>{
        const nameRegex=/^(\d{4}-){2}\d{4}$/;
        return nameRegex.test(name);
    }

    // Envio de formulario
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(!isEmailValid(email)){
            alert('No es valido');
            return;
        }
        //Alerta de Nombre
        /*
        if(!isNameValid(name)){
            alert('Nombre no valido');
            return;
        }*/
    }

    return (
        
        <div className='container-lg'>
        <br></br>
        <div className='container-sm'>
             <div className='tittle'>
            <br></br>
            <h1>Registro de Usuario</h1>
            <br></br>
            </div>
            <div className='row'>
                <div className='col'>
                    <img src={process.env.PUBLIC_URL + '/Isotipo sin fondo.png'} alt="Descripción de la imagen" />
                </div>
                <div className='col'>  
                    <form encType='multipart/form-data'>
                        <InputText type={'text'} fieldLabel={'Nombres'} fieldName={'firstName'} placeholder={'Ingrese Nombres'} inputValue={firtsName} onChangeHandler={handleFirtsNameValueChange} />
                        <InputText type={'text'} fieldLabel={'Apellidos'} fieldName={'lastName'} placeholder={'Ingrese Apellidos'} inputValue={lastName} onChangeHandler={handleLastNameValueChange} />
                        <InputText type={'number'} fieldLabel={'DNI'} fieldName={'dni'} placeholder={'Ingrese el DNI con formato xxxx-xxxx-xxxxx'} inputValue={dni} onChangeHandler={handleDniValueChange} />
                        <InputText type={'email'} fieldLabel={'Correo Electrónico'} fieldName={'email'} placeholder={'micorreo@dominio.com'} inputValue={email} onChangeHandler={handleEmailValueChange} />
                        <InputText type={'text'} fieldLabel={'Teléfono Celular'} fieldName={'phoneNumber'} placeholder={'Número de teléfono celular del tipo xxxx-xxxx'} inputValue={phoneNumber} onChangeHandler={handlePhoneNumberValueChange} />
                        <Date fieldLabel={'Fecha de Nacimiento'} fieldName={'birthDate'} inputValue={birthDate} onChangeHandler={handleBirthDateValueChange} />

                        <div className="input-group mb-3">
                            <label className='input-group-text'>Departamento</label>
                            <select className='form-select'
                                type="list"
                                value={addressDepartment}
                                required
                                onChange={handleAddressDepartmentValueChange}
                            >
                                <option value="">Seleccione un Departamento</option>
                                {departments.map((department) => (
                                    <option key={department.id} value={department.id}>{department.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group mb-3">
                            <label className='input-group-text'>Municipio</label>
                            <select
                                className='form-select'
                                type="list"
                                value={addressMunicipality}
                                required
                                onChange={handleAddressMunicipalityValueChange}
                            >
                                <option value="">Seleccione un Municipio</option>
                                {municipalities.map((municipality) => (
                                    <option hidden={municipality.departmentIdFK != addressDepartment} key={municipality.id} value={municipality.id}>{municipality.name}</option>
                                ))}
                            </select>
                        </div>

                        <InputText type={'password'} fieldLabel={'Contraseña'} fieldName={'password'} placeholder={'Contraseña de entre 8 y 35 caractéres'} inputValue={password} required={true} onChangeHandler={handlePasswordValueChange} />
                        <InputText type={'password'} fieldLabel={'Confirmación Contraseña'} fieldName={'passwordConfirmation'} placeholder={'Escriba la confirmación de la contraseña.'} inputValue={passwordConfirmation} required={true} onChangeHandler={handlePasswordConfirmationValueChange} />
                        <a href='#' onClick={handleOpenModal}>Open Modal</a>
                        <Agreement isOpen={isModalOpen} onClose={handleCloseModal}/>

                        <Checkbox fieldLabel={'Acepto Términos y Condiciones'} fieldName={'userAgreement'} inputValue={isAccepted} onChangeHandler={handleIsAcceptedValueChange} />
                        <Button type={'submit'} fieldLabel={'Registrar'} onClick={handleFormSubmit} />
                    </form>
                </div>
            </div>
            <br></br>
        </div>
        <br></br>
        </div>
    );
}

export default UserRegitration;
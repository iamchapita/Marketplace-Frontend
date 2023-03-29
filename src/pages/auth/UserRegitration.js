import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../utils/apiClient';
import Button from '../../components/Button';
import InputText from '../../components/InputText';
import BirthDateInput from '../../components/BirthDateInput';
import Checkbox from '../../components/Checkbox';
import Agreement from '../../pages/auth/Agreement';
import Alert from '../../components/common/Alert';

const UserRegitration = ({ isLoggedIn, setLoggedIn }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [addressDepartment, setAddressDepartment] = useState('');
    const [addressMunicipality, setAddressMunicipality] = useState('');

    // Almacena los departamentos y municipios 
    const [departments, setDepartments] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);

    // Almacena el estado de las validaciones de cada campo
    const [isAccepted, setIsAccepted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFirstNameValid, setIsFirstNameValid] = useState(true);
    const [isLastNameValid, setIsLastNameValid] = useState(true);
    const [isDNIValid, setIsDNIValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isPasswordConfirmationValid, setIsPasswordConfirmationValid] = useState(true);
    const [isAddressdDepartmentValid, setIsAddressdDepartmentValid] = useState(true);
    const [isAddressdMunicipalityValid, setIsAddressdMunicipalityValid] = useState(true);

    // variables de estado para el alert donde se mostrara los errores
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const namesRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ']{3,30}( [a-zA-ZáéíóúÁÉÍÓÚñÑüÜ']{3,30})*$/;
    const dniRegex = /^\d{4}-\d{4}-\d{5}$/;
    const emailRegex = /[a-z0-9_-]+(?:\.[a-z0-9-_]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const phoneNumberRegex = /^[389]\d{7}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-záéíóúüñ])(?=.*[A-ZÁÉÍÓÚÜÑ])(?=.*[-+_*@#$!%.¿?\sáéíóúüñÁÉÍÓÚÜÑ]).{8,35}$/;
    const addressDepartmentRegex = /^(1[0-8]|[1-9])$/;
    const addressMunicipalityRegex = /^(?:[1-9]|[1-9][0-9]|[12][0-8][0-9]|29[0-8])$/;

    // Se utiliza para redireccionar a una ruta
    const navigate = useNavigate();

    //  Variable que almacena el mensaje de error retornado en el Alert
    let validationMessages = '';

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

    // Apertura y Cierre de Ventana Modal para el Acuerdo de Usuario
    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleFirtsNameValueChange = (e) => {
        setFirstName(e.target.value);
        namesRegex.test(e.target.value) ? setIsFirstNameValid(true) : setIsFirstNameValid(false);
    };
    const handleLastNameValueChange = (e) => {
        setLastName(e.target.value);
        namesRegex.test(e.target.value) ? setIsLastNameValid(true) : setIsLastNameValid(false);
    };
    const handleDniValueChange = (e) => {
        setDni(e.target.value);
        dniRegex.test(e.target.value) ? setIsDNIValid(true) : setIsDNIValid(false);
    };
    const handleEmailValueChange = (e) => {
        setEmail(e.target.value);
        emailRegex.test(e.target.value) ? setIsEmailValid(true) : setIsEmailValid(false);
    };
    const handlePhoneNumberValueChange = (e) => {
        setPhoneNumber(e.target.value);
        phoneNumberRegex.test(e.target.value) ? setIsPhoneNumberValid(true) : setIsPhoneNumberValid(false);
    };
    const handleBirthDateValueChange = (e) => {
        setBirthDate(e.target.value);
    };
    const handlePasswordValueChange = (e) => {
        setPassword(e.target.value);
        passwordRegex.test(e.target.value) ? setIsPasswordValid(true) : setIsPasswordValid(false);
    };
    const handlePasswordConfirmationValueChange = (e) => {
        setPasswordConfirmation(e.target.value);
        password === e.target.value ? setIsPasswordConfirmationValid(true) : setIsPasswordConfirmationValid(false);
    };
    const handleAddressDepartmentValueChange = (e) => {
        setAddressDepartment(e.target.value);
        addressDepartmentRegex.test(e.target.value) ? setIsAddressdDepartmentValid(true) : setIsAddressdDepartmentValid(false);
    };
    const handleAddressMunicipalityValueChange = (e) => {
        setAddressMunicipality(e.target.value);
        addressMunicipalityRegex.test(e.target.value) ? setIsAddressdMunicipalityValid(true) : setIsAddressdMunicipalityValid(false);
    };
    const handleIsAcceptedValueChange = (e) => {
        e.target.checked ? setIsAccepted(true) : setIsAccepted(false);
    };

    const validatingAllFields = () => {

        // Validando Nombres
        !namesRegex.test(firstName) ? validationMessages = validationMessages + '<br>El contenido del campo Nombre no es válido.' : validationMessages = validationMessages + '';

        // Validando Apellidos
        !namesRegex.test(lastName) ? validationMessages = validationMessages + '<br>El contenido del campo Apellidos no es válido.' : validationMessages = validationMessages + '';

        // Validando DNI
        !dniRegex.test(dni) ? validationMessages = validationMessages + '<br>El contenido del campo DNI no es válido.' : validationMessages = validationMessages + '';

        // Validando el Correo Electrónico
        !emailRegex.test(email) ? validationMessages = validationMessages + '<br>El contenido del campo Correo Electrónico no es válido.' : validationMessages = validationMessages + '';

        // Validando Telefono
        !phoneNumberRegex.test(phoneNumber) ? validationMessages = validationMessages + '<br>El contenido del campo Teléfono Celular no es válido.' : validationMessages = validationMessages + '';

        // Validando Fecha de Nacimiento
        birthDate.length === 0 ? validationMessages = validationMessages + '<br>El contenido del Campo Fecha de Nacimiento no es válido.' : validationMessages = validationMessages + '';

        // Validando Departamento
        !addressDepartmentRegex.test(addressDepartment) ? validationMessages = validationMessages + '<br>El Departamento seleccionado no es válido.' : validationMessages = validationMessages + '';

        // Validando Municipio
        !addressMunicipalityRegex.test(addressMunicipality) ? validationMessages = validationMessages + '<br>El Municipio seleccionado no es válido.' : validationMessages = validationMessages + '';

        // Validando Contraseña
        !passwordRegex.test(password) ? validationMessages = validationMessages + '<br>La Contraseña debe tener:<ul> <li>8 caractéres mínimo y 35 caractéres máximo.</li> <li>Al menos 1 letra minúscula.</li> <li>Al menos 1 letra mayúscula.</li> <li>Al menos un número.</li> <li>Al menos un símbolo (-+_*@#$!%.¿?).</li></ul>' : validationMessages = validationMessages + '';

        // Validando la Confirmacion de la Contraseña
        !passwordRegex.test(passwordConfirmation) ? validationMessages = validationMessages + 'Las Contraseñas no coinciden.' : validationMessages = validationMessages + '';

        // Validando que el usuario Acepte los Términos y Condiciones
        !isAccepted ? validationMessages = validationMessages + '<br>Debe aceptar los Términos y Condiciones.' : validationMessages = validationMessages + '';
    }

    // Envio de formulario
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Ejecutanto las validaciones de los campos
        validatingAllFields();

        if (validationMessages.length > 1) {
            setAlertMessage(validationMessages);
            setShowAlert(true);
        } else {
            // Envio de datos del form, realizacion de registro de usuarios
            const registerUser = async () => {
                const register = await apiClient.post('/register', {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    dni: dni,
                    phoneNumber: phoneNumber,
                    birthDate: birthDate,
                    password: password
                }).then(response => {
                    // Guardando el Token de sesion
                    const token = response.data.access_token;
                    localStorage.setItem('access_token', token);
                    
                    apiClient.get('/user').then((response) => {
                        localStorage.setItem('id', response.data.id);
                    }).catch((error) => {
                        console.log(error.response.data);
                    })

                    apiClient.post('/createDirection', {
                        departmentIdFK: addressDepartment,
                        municipalityIdFK: addressMunicipality,
                        userIdFK: response.data.id
                    }).then(response => {
                        if (response.status === 200) {
                            setLoggedIn(true);
                            // Redireccionando a la ruta base
                            navigate('/');
                        }
                    }).catch(error => {
                        // console.log(error.response);
                    });
                }).catch(error => {

                    let errors = error.response.data.error;
                    let keys = Object.keys(errors);
                    let errorMessage = ''

                    keys.map((key) => {
                        errorMessage = errorMessage + '<br>' + errors[key][0];
                    })

                    setShowAlert(true);
                    setAlertMessage(errorMessage);
                });
            }

            registerUser();

        }
    }

    return (

        <div>
            <div className='container-sm'>
                <div className='tittle'>
                    <h1>Registro de Usuario</h1>
                </div>
                <div className='row center'>
                    <div className='col-sm'>
                        <img src={process.env.PUBLIC_URL + '/Isotipo sin fondo.png'} alt="Descripción de la imagen" width='500' />
                    </div>
                    <div className='col-md'>
                        <form encType='multipart/form-data'>
                            <Alert text={alertMessage} showAlert={showAlert} setShowAlert={setShowAlert} />
                            <InputText type={'text'} fieldLabel={'Nombres'} fieldName={'firstName'} placeholder={'Ingrese Nombres'} inputValue={firstName} isValid={isFirstNameValid} onChangeHandler={handleFirtsNameValueChange} />
                            <InputText type={'text'} fieldLabel={'Apellidos'} fieldName={'lastName'} placeholder={'Ingrese Apellidos'} inputValue={lastName} isValid={isLastNameValid} onChangeHandler={handleLastNameValueChange} />
                            <InputText type={'text'} fieldLabel={'DNI'} fieldName={'dni'} placeholder={'Ingrese el DNI con formato xxxx-xxxx-xxxxx'} inputValue={dni} isValid={isDNIValid} onChangeHandler={handleDniValueChange} />
                            <InputText type={'email'} fieldLabel={'Correo Electrónico'} fieldName={'email'} placeholder={'micorreo@dominio.com'} inputValue={email} isValid={isEmailValid} onChangeHandler={handleEmailValueChange} />
                            <InputText type={'text'} fieldLabel={'Teléfono Celular'} fieldName={'phoneNumber'} placeholder={'Número de teléfono celular del tipo xxxxxxxx'} inputValue={phoneNumber} isValid={isPhoneNumberValid} onChangeHandler={handlePhoneNumberValueChange} />
                            <BirthDateInput fieldLabel={'Fecha de Nacimiento'} fieldName={'birthDate'} inputValue={birthDate} onChangeHandler={handleBirthDateValueChange} />

                            <div className="input-group mb-3">
                                <label className='input-group-text'>Departamento</label>
                                <select className={`form-control ${isAddressdDepartmentValid ? "" : "invalid"}`}
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
                                    className={`form-control ${isAddressdMunicipalityValid ? "" : "invalid"}`}
                                    type="list"
                                    value={addressMunicipality}
                                    required
                                    onChange={handleAddressMunicipalityValueChange}
                                >
                                    <option value="">Seleccione un Municipio</option>
                                    {municipalities.map((municipality) => (
                                        <option hidden={municipality.departmentIdFK !== parseInt(addressDepartment)} key={municipality.id} value={municipality.id}>{municipality.name}</option>
                                    ))}
                                </select>
                            </div>

                            <InputText type={'password'} fieldLabel={'Contraseña'} fieldName={'password'} placeholder={'Contraseña de entre 8 y 35 caractéres'} inputValue={password} required={true} isValid={isPasswordValid} onChangeHandler={handlePasswordValueChange} />
                            <InputText type={'password'} fieldLabel={'Confirmación Contraseña'} fieldName={'passwordConfirmation'} placeholder={'Escriba la confirmación de la contraseña.'} inputValue={passwordConfirmation} required={true} isValid={isPasswordConfirmationValid} onChangeHandler={handlePasswordConfirmationValueChange} />
                            <a href='#' onClick={handleOpenModal}>Términos y Condiciones</a>
                            <Agreement isOpen={isModalOpen} onClose={handleCloseModal} />

                            <Checkbox fieldLabel={'Acepto Términos y Condiciones'} fieldName={'userAgreement'} checkedValue={isAccepted} required={true} onChangeHandler={handleIsAcceptedValueChange} />
                            <Button type={'submit'} fieldLabel={'Registrar'} onClick={handleFormSubmit} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserRegitration;
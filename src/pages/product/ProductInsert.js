import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import apiClient from '../../utils/apiClient';
import InputText from '../../components/InputText';
import TextArea from "../../components/TextArea";
import InputFile from "../../components/InputFile";
import Button from '../../components/Button';
import SelectInput from "../../components/SelectInput";
import Alert from "../../components/common/Alert";


const ProductInsert = ({ isLoggedIn, setLoggedIn }) => {

    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState(false);
    const [description, setDescription] = useState('');
    const [isDescriptionValid, setIsDescriptionValid] = useState(false);
    const [price, setPrice] = useState('');
    const [isPriceValid, setIsPriceValid] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [isPhotosValid, setIsPhotosValid] = useState(false);
    const [status, setStatus] = useState('');
    const [isStatusValid, setIsStatusValid] = useState(false);

    // Almacena el valor de la catetoria obtenida en el form
    const [productCategory, setProductCategory] = useState('');
    const [isProductCategoryValid, setIsProductCategoryValid] = useState(false);

    // Almacena todas las categorias obtenidas desde la base de datos
    const [productCategories, setProductCategories] = useState([]);

    // Controla el Alert de error
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    //  Variable que almacena el mensaje de error retornado en el Alert
    var validationMessages = '';

    // Variable que almacena las fotos convertidas
    const [photosConvertered, setPhotosConvertered] = useState({});

    // Se utiliza para redireccionar a una ruta
    const navigate = useNavigate();

    // Expresiones regulares para validacion
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d\-\_\.\,\;\:\(\)\"\'\!]{2,50}$/;
    const descriptionRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d\-\_\.\,\;\:\(\)\"\'\!]{10,250}$/;
    const priceRegex = /^\d+(?:\.\d{1,2})?$/;
    const statusRegex = /^[12]$/;
    const categoryRegex = /^(0?[1-9]|[1-2][0-9]|3[0-1])$/

    // Obtiene las categorias de los productos desde la base de datos
    useEffect(() => {

        const action = async () => {
            try {
                const response = await apiClient.get('/categories', {
                }).then((response) => {
                    setProductCategories(response.data);
                }).catch((error) => {
                    console.log(error);
                })
            } catch (error) {
            }
        }

        action();
    }, []);

    // Se ejecuta cada vez que el valor de photos cambie
    // Aqui se realiza la validacion y conversion de los archivos recibidos desde el form
    useEffect(() => {

        let photosConverteredArray = [];

        photos.map((photo) => {
            const reader = new FileReader();
            reader.readAsDataURL(photo);

            reader.onload = () => {
                const base64String = ((reader.result).split(';')[1]).split(',')[1];
                let photoData = { 'name': photo.name, 'base64Image': base64String };
                photosConverteredArray.push(photoData);
            }
        });

        setPhotosConvertered(photosConverteredArray);
        setIsPhotosValid(true);
    }, [photos]);

    const nameChangeHandler = (e) => {
        setName(e.target.value);
        nameRegex.test(e.target.value) ? setIsNameValid(true) : setIsNameValid(false);
    }

    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value);
        descriptionRegex.test(e.target.value) ? setIsDescriptionValid(true) : setIsDescriptionValid(false);
    }

    const priceChangeHandler = (e) => {
        setPrice(e.target.value);
        priceRegex.test(e.target.value) ? setIsPriceValid(true) : setIsPriceValid(false);
    }

    const photosChangeHandler = (e) => {
        const filesArray = Array.from(e.target.files);
        setPhotos(filesArray);
    }

    const statusChangeHandler = (e) => {
        setStatus(e.target.value);
        statusRegex.test(e.target.value) ? setIsStatusValid(true) : setIsStatusValid(false);
    }

    const productCategoryChangeHandler = (e) => {
        setProductCategory(e.target.value);
        categoryRegex.test(e.target.value) ? setIsProductCategoryValid(true) : setIsProductCategoryValid(false);
    }

    const validateFields = () => {

        !nameRegex.test(name) ? validationMessages = validationMessages + '<br>El contenido del campo Nombre no es válido.' : validationMessages = validationMessages + '';

        !descriptionRegex.test(description) ? validationMessages = validationMessages + '<br>El contenido del campo Descripción no es válido.' : validationMessages = validationMessages + '';

        !priceRegex.test(price) ? validationMessages = validationMessages + '<br>El contenido del campo Precio no es válido.' : validationMessages = validationMessages + '';

        photos.map((photo) => {
            const fileType = String(photo.type).split('/')[0];

            if (fileType !== 'image') {

                !validationMessages.includes('tipo imagen') ? validationMessages = validationMessages + '<br>Los archivos cargados no son del tipo imagen.' : validationMessages = validationMessages + '';
                setIsPhotosValid(false);
            }
        });

        photos.length > 6 ? validationMessages = validationMessages + '<br>Solamente se pueden subir 6 imágenes por producto.' : validationMessages = validationMessages + '';

        photos.length === 0 ? validationMessages = validationMessages + '<br>No se ha seleccionado ningún archivo.' : validationMessages = validationMessages + '';

        !categoryRegex.test(productCategory) ? validationMessages = validationMessages + '<br> El valor de Estado del Producto no es válido.' : validationMessages = validationMessages + '';

        !statusRegex.test(status) ? validationMessages = validationMessages + '<br> El valor de Categoría del Producto no es válido.' : validationMessages = validationMessages + '';

    }

    const submitHandler = (e) => {
        e.preventDefault();

        validateFields();

        if (validationMessages.length > 1) {
            setAlertMessage(validationMessages);
            setShowAlert(true);
        } else {
            setShowAlert(false);
            const action = async () => {
                try {
                    const response = await apiClient.get('/user').then((response) => {
                        var id = response.data['id'];

                        apiClient.post('/createProduct', {
                            name: name,
                            description: description,
                            price: price,
                            photos: photosConvertered,
                            status: status === '1' ? 'Nuevo' : 'Usado',
                            userIdFK: id,
                            categoryIdFK: productCategory

                        }).then((response) => {
                            // Redireccionando a la ruta base
                            navigate('/home');

                        }).catch((error) => {
                            setAlertMessage(error.response.data.message);
                            setShowAlert(true);
                        })
                    }).catch((error) => {
                        setAlertMessage(error.response.data.message);
                        setShowAlert(true);
                    })
                } catch (error) {
                }
            }
            action();
        }
    }

    return (
        <div className='container-sm'>
            <div className='tittle'>
                <h1>Registro de Producto</h1>
            </div>
            <div className='row'>
                <form encType='multipart/form-data'>
                    <Alert text={alertMessage} showAlert={showAlert} setShowAlert={setShowAlert} />
                    <InputText type={'text'} fieldLabel={'Nombre'} fieldName={'name'} placeholder={'Ingrese un nombre descriptivo del Producto'} inputValue={name} onChangeHandler={nameChangeHandler} isValid={isNameValid} />

                    <TextArea fieldLabel={'Descripción'} fieldName={'description'} placeholder={'Brinde una descripción amplia del producto'} inputValue={description} onChangeHandler={descriptionChangeHandler} isValid={isDescriptionValid} />

                    <InputText type={'number'} fieldLabel={'Precio'} fieldName={'price'} placeholder={'Ingrese el Precio del Producto'} inputValue={price} onChangeHandler={priceChangeHandler} isValid={isPriceValid} step={true} />

                    <InputFile type={'file'} fieldLabel={'Fotografías'} fieldName={'photos'} placeholder={'Suba fotografías del Producto'} inputValue={photos} onChangeHandler={photosChangeHandler} required={true} isValid={isPhotosValid} accept={['image/*']} />

                    <SelectInput fieldLabel={'Categoría del Producto'} fieldName={'categoryIdFK'} firstOptionValue={'Seleccione la Categoría del Producto'} optionsValues={productCategories} inputValue={productCategory} onChangeHandler={productCategoryChangeHandler} required={true} />

                    <SelectInput fieldLabel={'Estado del Producto'} fieldName={status} firstOptionValue={'Seleccione el Estado del Producto'} optionsValues={[{ 'id': 1, 'name': 'Nuevo' }, { 'id': 2, 'name': 'Usado' }]} inputValue={status} onChangeHandler={statusChangeHandler} required={true} />

                    <Button type={'submit'} fieldLabel={'Registrar Producto'} onClick={submitHandler} />
                </form>
            </div>
        </div>
    );
}

export default ProductInsert;
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../utils/apiClient';
import InputText from '../../components/InputText';
import TextArea from "../../components/TextArea";
import Button from '../../components/Button';
import SelectInput from "../../components/SelectInput";
import Alert from "../../components/common/Alert";
import { Spinner } from "react-bootstrap";
import CustomizableAlert from '../../components/CustomizableAlert';
import Dropzone from "../../components/Dropzone";

const ProductEdit = ({ isLoggedIn, isSeller, areUserStatusLoaded }) => {

    const { id } = useParams();

    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState(false);
    const [description, setDescription] = useState('');
    const [isDescriptionValid, setIsDescriptionValid] = useState(false);
    const [price, setPrice] = useState('');
    const [isPriceValid, setIsPriceValid] = useState(false);
    const [status, setStatus] = useState('');
    const [isStatusValid, setIsStatusValid] = useState(false);
    const [product, setProduct] = useState([]);
    const [wasProductFound, setWasProductFound] = useState(false);
    const [productImages, setProductImages] = useState([]);

    // Almacena las imagenes del dropzone
    const [images, setImages] = useState([]);
    const [areImagesValid, setAreImagesValid] = useState(true);

    const [isReadyToRender, setIsReadyToRender] = useState(false);
    // Almacena el valor de la catetoria obtenida en el form
    const [productCategory, setProductCategory] = useState('');
    const [isProductCategoryValid, setIsProductCategoryValid] = useState(false);
    // Almacena todas las categorias obtenidas desde la base de datos
    const [productCategories, setProductCategories] = useState([]);
    // Controla el Alert de error
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    // Variable que almacena las fotos convertidas
    const [photosConvertered, setPhotosConvertered] = useState({});
    //  Variable que almacena el mensaje de error retornado en el Alert
    var validationMessages = '';
    // Se utiliza para redireccionar a una ruta
    const navigate = useNavigate();

    // Expresiones regulares para validacion
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d\-\_\.\,\;\:\(\)\"\'\!]{2,50}$/;
    const descriptionRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d\-\_\.\,\;\:\(\)\"\'\!]{10,250}$/;
    const priceRegex = /^\d+(?:\.\d{1,2})?$/;
    const statusRegex = /^[12]$/;
    const categoryRegex = /^(0?[1-9]|[1-2][0-9]|3[0-1])$/

    useEffect(() => {
        const action = async () => {
            const response = await apiClient.get(`/product/${id}`).then((response) => {

                if (localStorage.getItem('id') === String(response.data.userId)) {
                    setWasProductFound(true);
                    setProduct(response.data);
                    setName(response.data.name);
                    setIsNameValid(true);
                    setDescription(response.data.description);
                    setIsDescriptionValid(true);
                    setPrice(response.data.price);
                    setIsPriceValid(true);
                    setProductCategory(response.data.categoryIdFK);
                    setIsProductCategoryValid(true);
                    setStatus(response.data.status === 'Nuevo' ? 1 : 2);
                    setIsStatusValid(true);
                } else {
                    setWasProductFound('Unauthorized');
                    setIsReadyToRender(true);
                }

            }).catch((error) => {
                if (error.response.status === 500) {
                    setWasProductFound(false);
                    setIsReadyToRender(true);
                }
            });
        }

        action();
    }, []);

    // Obtiene las imagenes del producto
    useEffect(() => {

        const action = async () => {
            await apiClient.post('/getProductImages', {
                path: product['photos']
            }).then((response) => {
                setProductImages(response.data);
            }).catch((error) => {
                setAlertMessage(error.response.data.message);
            });

        }

        if (product.length !== 0) {
            action();
        }

    }, [product]);

    useEffect(() => {
        if (productImages.length !== 0) {

            const imageList = productImages.map((image) => {
                const base64Image = image.base64Image;
                const name = image.name
                // Convertir la imagen base64 a un Blob
                const byteString = atob(base64Image);
                const mimeString = `image/${name.split('.')[1]}`;
                const arrayBuffer = new ArrayBuffer(byteString.length);
                const intArray = new Uint8Array(arrayBuffer);
                for (let i = 0; i < byteString.length; i++) {
                    intArray[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([arrayBuffer], { type: mimeString });

                // Crear un objeto tipo File con el Blob y el nombre del archivo
                let file = new File([blob], name, { type: mimeString });

                return file;
            })

            setImages((prevImages) => prevImages.concat(imageList));
            setIsReadyToRender(true);
        }
    }, [productImages]);

    // Obtiene las categorias de los productos desde la base de datos
    useEffect(() => {

        const action = async () => {

            const response = await apiClient.get('/categories', {
            }).then((response) => {
                setProductCategories(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }

        if (product !== null) {
            action();
        }

    }, [product]);

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

    const statusChangeHandler = (e) => {
        setStatus(e.target.value);
        statusRegex.test(e.target.value) ? setIsStatusValid(true) : setIsStatusValid(false);
    }

    const productCategoryChangeHandler = (e) => {
        setProductCategory(e.target.value);
        categoryRegex.test(e.target.value) ? setIsProductCategoryValid(true) : setIsProductCategoryValid(false);
    }

    const validateFields = () => {

        console.log(images);

        !nameRegex.test(name) ? validationMessages = validationMessages + '<br>El contenido del campo Nombre no es válido.' : validationMessages = validationMessages + '';

        !descriptionRegex.test(description) ? validationMessages = validationMessages + '<br>El contenido del campo Descripción no es válido.' : validationMessages = validationMessages + '';

        !priceRegex.test(price) ? validationMessages = validationMessages + '<br>El contenido del campo Precio no es válido.' : validationMessages = validationMessages + '';

        images.map((image) => {
            if (!image.type.includes('image')) {
                !validationMessages.includes('tipo imagen') ? validationMessages = validationMessages + '<br>Al menos uno de los archivos cargados no es del tipo imagen.' : validationMessages = validationMessages + '';
                setAreImagesValid(false);
            }
        });

        images.length > 6 ? validationMessages = validationMessages + '<br>Solamente se pueden subir 6 imágenes por producto.' : validationMessages = validationMessages + '';

        images.length === 0 ? validationMessages = validationMessages + '<br>No se ha seleccionado ningún archivo.' : validationMessages = validationMessages + '';

        !isStatusValid ? validationMessages = validationMessages + '<br> El valor de Estado del Producto no es válido.' : validationMessages = validationMessages + '';

        !isProductCategoryValid ? validationMessages = validationMessages + '<br> El valor de Categoría del Producto no es válido.' : validationMessages = validationMessages + '';

    }

    const submitHandler = (e) => {
        e.preventDefault();

        validateFields();

        if (validationMessages.length > 1) {
            setAlertMessage(validationMessages);
            setShowAlert(true);
        } else {
            setShowAlert(false);
            // const action = async () => {
            //     const response = await apiClient.post('/createProduct', {
            //         name: name,
            //         description: description,
            //         price: price,
            //         photos: photosConvertered,
            //         status: status === '1' ? 'Nuevo' : 'Usado',
            //         userIdFK: localStorage.getItem('id'),
            //         categoryIdFK: productCategory
            //     }).then((response) => {
            //         // Redireccionando a la ruta base
            //         navigate('/myProfile');

            //     }).catch((error) => {
            //         setAlertMessage(error.response.data.message);
            //         setShowAlert(true);
            //     })
            // }
            // action();
        }
    }

    if (areUserStatusLoaded === false) {
        return (
            <div className='container-fluid' style={{ marginTop: '3em' }}>
                <div className="container d-flex justify-content-center">
                    <Spinner animation="border" variant='light' />
                </div>
            </div>
        )
    }

    if (areUserStatusLoaded === true) {

        if (isSeller === false) {
            return (
                <CustomizableAlert title={'Error'} text={'No tienes autorización para acceder a este recurso.'} variant={'danger'} />
            )
        }

        if (isReadyToRender === false) {
            return (
                <div className='container-fluid' style={{ marginTop: '3em' }}>
                    <div className="container d-flex justify-content-center">
                        <Spinner animation="border" variant='light' />
                    </div>
                </div>
            )
        } else {

            if (wasProductFound === false) {
                return (
                    <CustomizableAlert title={'Error'} text={'No se encontró el producto.'} variant={'danger'} />
                )
            }

            if (wasProductFound === 'Unauthorized') {
                return (
                    <CustomizableAlert title={'Error'} text={'No tienes autorización para acceder a este recurso.'} variant={'danger'} />
                )
            }

            if (product.length !== 0) {
                return (
                    <div className='container-sm'>
                        <div className='tittle'>
                            <h1>Editar Producto</h1>
                        </div>
                        <div className='row center'>
                            <div className="col-12">
                                <form encType='multipart/form-data' className='formulario'>
                                    <Alert text={alertMessage} showAlert={showAlert} setShowAlert={setShowAlert} />
                                    <InputText type={'text'} fieldLabel={'Nombre'} fieldName={'name'} placeholder={'Ingrese un nombre descriptivo del Producto'} inputValue={name} onChangeHandler={nameChangeHandler} isValid={isNameValid} />

                                    <TextArea fieldLabel={'Descripción'} fieldName={'description'} placeholder={'Brinde una descripción amplia del producto'} inputValue={description} onChangeHandler={descriptionChangeHandler} isValid={isDescriptionValid} />

                                    <InputText type={'number'} fieldLabel={'Precio'} fieldName={'price'} placeholder={'Ingrese el Precio del Producto'} inputValue={price} onChangeHandler={priceChangeHandler} isValid={isPriceValid} step={true} />

                                    <Dropzone images={images} setImages={setImages} setImages={setImages} isValid={areImagesValid} setIsValid={setAreImagesValid} />

                                    <SelectInput fieldLabel={'Categoría del Producto'} fieldName={'categoryIdFK'} firstOptionValue={'Seleccione la Categoría del Producto'} optionsValues={productCategories} inputValue={productCategory} onChangeHandler={productCategoryChangeHandler} required={true} />

                                    <SelectInput fieldLabel={'Estado del Producto'} fieldName={status} firstOptionValue={'Seleccione el Estado del Producto'} optionsValues={[{ 'id': 1, 'name': 'Nuevo' }, { 'id': 2, 'name': 'Usado' }]} inputValue={status} onChangeHandler={statusChangeHandler} required={true} />

                                    <Button type={'submit'} fieldLabel={'Actualizar Producto'} onClick={submitHandler} />
                                </form>
                            </div>
                        </div>
                    </div>
                );
            }

        }
    }
}

export default ProductEdit;
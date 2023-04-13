import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../utils/apiClient';
import { Spinner } from 'react-bootstrap';
import SellerProductCard from '../../components/SellerProductCard';
import CustomizableAlert from '../../components/CustomizableAlert';

const SellerProfile = ({ areUserStatusLoaded }) => {

    // Variables de estado, Se almacena la informacion a renderizar en la vista
    const [sellerInfo, setSellerInfo] = useState(null);
    const [products, setProducts] = useState([]);
    const [readyToRender, setReadyToRender] = useState(false);
    const [productsWereFound, setProductsWereFound] = useState(null);
    const [idClient, setIdClient] = useState();
    const [idSeller, setIdSeller] = useState();
    const [rating, setRating] = useState();

    const [star1, setStar1] = useState(false);
    const [star2, setStar2] = useState(false);
    const [star3, setStar3] = useState(false);
    const [star4, setStar4] = useState(false);
    const [star5, setStar5] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();


    

    const valueStar = async(e) =>{
       
        if(e === 1){
            setStar1(true);
            setStar2(false);
            setStar3(false);
            setStar4(false);
            setStar5(false);
        }else if(e === 2){
            setStar1(true);
            setStar2(true);
            setStar3(false);
            setStar4(false);
            setStar5(false);
           
        }
        else if(e === 3){
            setStar1(true);
            setStar2(true);
            setStar3(true);
            setStar4(false);
            setStar5(false);
        }
        else if(e === 4){
            setStar1(true);
            setStar2(true);
            setStar3(true);
            setStar4(true);
            setStar5(false);
        }
        else if(e === 5){
            setStar1(true);
            setStar2(true);
            setStar3(true);
             setStar4(true);
            setStar5(true); 
        }
        
        setIdSeller(id);
        await apiClient.post('/rating',{
            userIdFK : localStorage.getItem('id'), 
            ratedUserIdFK : parseInt(id), 
            rating : e
        }).then((res)=>{
        
            
        }).catch((error) => {
            console.log(error)
        });
    }

    // aqui se hace un llamado al usuario registrado para agarrar el id

    useEffect(() => {
        const getrating = async () => {
            await apiClient.post('/getrating', { 
                userIdFK : localStorage.getItem('id'), 
                ratedUserIdFK : id
            }).then((res) => { 
                setRating(res.data[0].rating);
                if(res.data[0].rating === 1){
                    setStar1(true);
                    setStar2(false);
                    setStar3(false);
                    setStar4(false);
                    setStar5(false);
                }else if(res.data[0].rating === 2){
                    setStar1(true);
                    setStar2(true);
                    setStar3(false);
                    setStar4(false);
                    setStar5(false);
                   
                }
                else if(res.data[0].rating === 3){
                    setStar1(true);
                    setStar2(true); 
                    setStar3(true);
                    setStar4(false);
                    setStar5(false);
                }
                else if(res.data[0].rating === 4){
                    setStar1(true);
                    setStar2(true);
                    setStar3(true);
                    setStar4(true);
                    setStar5(false);
                }
                else if(res.data[0].rating === 5){
                    setStar1(true);
                    setStar2(true);
                    setStar3(true);
                     setStar4(true);
                    setStar5(true); 
                }
                
                
            }).catch((error) => {
                console.log(error)
            });
        }
        
        getrating(idClient, parseInt(id));
    }, [])

    

    // Se ejecuta cuando se crea el componente y cuando el valor de isLoggedIn cambie
    useEffect(() => {
        const action = async () => {
            // Obtiene los productos del vendedor
            const response = await apiClient.post('/getProductsBySeller', {
                // Envia el id del usuario vendedor. Se obtiene desde localstorage.
                // Este id se guarda en el componente de login.
                sellerId: id
            }).then((response) => {
                // Se establece el arreglo de productos no Banneados
                setProducts(response.data.filter(product => product.isBanned === 0));
                setProductsWereFound(true);
            }).catch((error) => {
                // Se debe renderizar un error de que no se encontro productos. PENDIENTE.
                if (error.response.status === 500) {

                    apiClient.post('/sellerDetails', {
                        id: id
                    }).then((response) => {
                        setSellerInfo(response.data);
                        setProductsWereFound(false);
                    }).catch(error => {
                        console.log(error.response.data);
                    })

                } else {
                    console.log(error.response.data);
                }
            });
        }

        if (id === localStorage.getItem('id')) {
            navigate('/myProfile');
        } else {
            action();
        }
    }, []);



    useEffect(() => {

        if (productsWereFound === false) {
            const sellerInfoObject = {
                'firstName': sellerInfo[0]['userFirstName'],
                'lastName': sellerInfo[0]['userLastName'],
                'email': sellerInfo[0]['userEmail'],
                'departmentName': sellerInfo[0]['departmentName'],
                'municipalityName': sellerInfo[0]['municipalityName']
            }
            setSellerInfo(sellerInfoObject);
            setReadyToRender(true);
        }
        // Establece la informacion del usuario del tipo vendedor
        if (products.length > 0) {
            const sellerInfoObject = {
                'firstName': products[0]['userFirstName'],
                'lastName': products[0]['userLastName'],
                'email': products[0]['userEmail'],
                'departmentName': products[0]['departmentName'],
                'municipalityName': products[0]['municipalityName']
            }
            setSellerInfo(sellerInfoObject);
            setReadyToRender(true);
        }
    }, [productsWereFound]);

    if (!areUserStatusLoaded) {

        return (
            <div className='container-fluid' style={{ marginTop: '3em' }}>
                <div className="container d-flex justify-content-center">
                    <Spinner animation="border" variant='light' />
                </div>
            </div>
        )
    }

    if (areUserStatusLoaded) {
        return (
            <div className='container-fluid' style={{ marginTop: '3em' }}>
                {
                    !readyToRender ? (
                        <div className="container d-flex justify-content-center">
                            <Spinner animation="border" variant='light' />
                        </div>
                    ) : (
                        <div className='row mx-4 my-3'>
                            <div className='col-md-3'>
                                <div className='col-md-12 container-style' style={{ margin: '0 0 1em 0', color: 'white' }}>
                                    <div className='userInfoContainer' style={{ padding: '1em 1em 1em 1em', wordWrap: 'break-word' }}>
                                        <div className='userInfo'>
                                            <h4>{sellerInfo.firstName + ' ' + sellerInfo.lastName}</h4>
                                            <p>Ubicación: {sellerInfo.departmentName}, {sellerInfo.municipalityName}</p>
                                            <p>Correo Electrónico: {sellerInfo.email}</p>
                                        </div>
                                        <div className='userStats'>
                                            <p>Proximamente</p>
                                            <button id="b1" className='btn-invisible' value="1" onClick={(e)=>valueStar(1)} ><i className={`material-icons ${star1 ? 'star-active ' : 'icon-star'}`} >grade</i></button>
                                            <button id="b2" className='btn-invisible' value="2" onClick={(e)=>valueStar(2)} ><i className={`material-icons ${star2 ? 'star-active ' : 'icon-star'}`} >grade</i></button>
                                            <button id="b3" className='btn-invisible' value="3" onClick={(e)=>valueStar(3)} ><i className={`material-icons ${star3 ? 'star-active ' : 'icon-star'}`} >grade</i></button>
                                            <button id="b4" className='btn-invisible' value="4" onClick={(e)=>valueStar(4)} ><i className={`material-icons ${star4 ? 'star-active ' : 'icon-star'}`} >grade</i></button>
                                            <button id="b5" className='btn-invisible' value="5" onClick={(e)=>valueStar(5)} ><i className={`material-icons ${star5 ? 'star-active ' : 'icon-star'}`} >grade</i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-9'>
                                <div className='col-md-12 container-style'>
                                    <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-4 row-cols-md-3 row-cols-sm-2 g-4">
                                        {
                                            productsWereFound ? (products.map((product, index) => (
                                                <SellerProductCard
                                                    key={index}
                                                    id={product.id}
                                                    name={product.name}
                                                    price={product.price}
                                                    path={product.photos}
                                                    isAvailable={product.isAvailable}
                                                    amount={product.amount}
                                                    createdAt={product.createdAt}
                                                    updatedAt={null}
                                                    hasProductOwnership={false}
                                                />
                                            ))) : (
                                                <CustomizableAlert title={''} text={'No se han publicado Productos'} variant={'info'} />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
};

export default SellerProfile;
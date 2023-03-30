import React, { useState, useEffect, } from "react";
import apiClient from "../../utils/apiClient";
import HomeProductCard from "../../components/HomeProductCard";
import { Spinner } from "react-bootstrap";
import { async } from "q";

const Home = ({ isLoggedIn }) => {

    const [products, setProducts] = useState(null);
    const [isReadyToRender, setIsReadyToRender] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isWhisListStatusInclude, setIsWhisListStatusInclude] = useState(null);
    const [categories , setCategories] = useState(null)
    const [departaments, setDepartaments] = useState(null);

    const filter = () =>{
        
    }


    useEffect(()=>{
        const getCategories = async () =>{
            await apiClient.get('/categories').then((res)=>{
                setCategories(res.data)
            }).catch((error) => {
                console.log(error)
            });
        }
        getCategories();

    },[])

    useEffect(()=>{
        const getDepartaments = async () =>{
            await apiClient.get('/departments').then((res)=>{
                setDepartaments(res.data)
            }).catch((error) => {
                console.log(error)
            });
        }
        getDepartaments();

    },[])

    useEffect(() => {
        const getUser = async () => {
            await apiClient.get('/user/').then((response) => {
                setUserId(response.data.id);
            }).catch((error) => {
                setUserId(false);
                setIsWhisListStatusInclude(false);
            });
        }
        getUser();
    }, []);

    useEffect(() => {

        if(isLoggedIn === false) {
            setIsWhisListStatusInclude(false);
            // setUserId(false);
        }

    }, [isLoggedIn])

    useEffect(() => {
        const getProducts = async () => {
            if (!userId) {
                await apiClient.get('/products').then((response) => {
                    setProducts(response.data);
                    setIsWhisListStatusInclude(false);
                }).catch((error) => {
                    console.log(error);
                });

            } else {
                await apiClient.get(`/productsWishList/${userId}`).then((response) => {
                    setProducts(response.data);
                    setIsWhisListStatusInclude(true);
                }).catch((error) => {
                    console.log(error);
                });
            }
        }

        if (userId !== null) {
            getProducts();
        }

    }, [userId, isLoggedIn]);


    if (!isReadyToRender) {
        
        if(products !== null){
            setIsReadyToRender(true);
        }

        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <div className="d-flex align-items-center justify-content-center">
                    <Spinner animation="border" variant="light" />
                </div>
            </div>
        );
    }

    if (isWhisListStatusInclude) {
        return (
            <div>
                <div className="filtro-container">
                    <nav className="navbar">
                        <div className="container-fluid" >
                            <div className="grid-6">
                            <div>
                            <select className="form-select" >
                                <option defaultValue={null} >Categoría</option>
                                {
                                    categories.map((categorie, id)=>(
                                        <option  key={id} value={categorie.id} >{categorie.name}</option>


                                    ))
                                }
                            </select>
                            </div>
                            <div>
                            <select className="form-select" >
                                <option defaultValue={null} >Departamento</option>
                                {
                                    departaments.map((departament, id)=>(
                                        <option key={id} value={departament.id}  >{departament.name}</option>
                                    ))
                                }
                               
                            </select>
                            </div>
                            <div>
                            <select className="form-select" >
                                <option defaultValue={null} >Estrellas de vendedor</option>
                            </select>
                            </div>
                            <div>
                            <input className="form-control" type="number" placeholder="Precio mínimo" ></input>
                            </div>
                            <div>
                            <input className="form-control" type="number" placeholder="Precio máximo" ></input>
                            </div>
                            <div> 
                                <button className="btn btn-primary" onClick={filter()} >
                                <i className="material-icons" >search</i>
                                </button>
                            </div>
                            </div>
                            

                        </div>
                        
                    </nav>
                </div>
                
                    <div className="container home">
                        <div className="grid-3">
                        {
                            products.map((product, id) => (
                                <HomeProductCard
                                    key={id}
                                    id={product.id}
                                    userId={userId}
                                    name={product.name}
                                    price={product.price}
                                    urlDetalles={`/productDetail/${product.id}`}
                                    path={product.photos}
                                    idSeller={product.userIdFK}
                                    nameSeller={product.userFirstName + ' ' + product.userLastName}
                                    isWhisListStatusInclude={true}
                                    heart={product.isProductInWishList}
                                // description={product.description}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }

    if (isWhisListStatusInclude === false) {
        return (
           
            <div className="container home">
                <div className="grid-3">
                {
                    products.map((product, id) => (
                        <div>
                        <HomeProductCard
                            key={id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            urlDetalles={`/productDetail/${product.id}`}
                            path={product.photos}
                            idSeller={product.userIdFK}
                            nameSeller={product.userFirstName + ' ' + product.userLastName}
                        // description={product.description}
                        />
                        </div>
                    ))
                }
            </div>
            </div>        );
    }
}
export default Home;
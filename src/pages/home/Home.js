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
    const [categories, setCategories] = useState(null)
    const [departaments, setDepartaments] = useState(null);
    const [category, setCategory] = useState(null)
    const [department, setDepartment] = useState(null);
    const [page, setPage] = useState(1);
    const [name, setname] = useState('');

    const [pricemin, setPricemin] = useState(0)
    const [pricemax, setPricemax] = useState(0)

    const [sortBy, setSortBy] = useState(''); // Estado para almacenar la opción de ordenamiento seleccionada
    const [sortOrder, setSortOrder] = useState('asc'); // Estado para almacenar el orden de ordenamiento (ascendente o descendente)
  
    const handleSortByChange = (e) => {
      setSortBy(e.target.value);
    }
  
    const handleSortOrderChange = (e) => {
      setSortOrder(e.target.value);
    }
  
    // Función para realizar el ordenamiento de los productos
    const sortProducts = (products) => {
      if (sortBy === 'createdAt') {
        return products.sort((a, b) => {
          if (sortOrder === 'asc') {
            return new Date(a.createdAt) - new Date(b.createdAt);
          } else {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
        });
      } else if (sortBy === 'price') {
        return products.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
      } else if (sortBy === 'name') {
        return products.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });
      } else {
        return products;
      }
    }

    const filter = async () => {
        await apiClient.post('/productst',
            {
                id: userId,
                category: category,
                department: department,
                page: page,
                pricemin: pricemin,
                pricemax: pricemax
            }).then((res) => {
                setProducts(res.data);

            }).catch((error) => {
                console.log(error)
            });


    }

    const searchProduct = async () => {
        await apiClient.get('/buscaproduct',
            {
                name: name
            }).then((res) => {
                setProducts(res.data);

            }).catch((error) => {
                console.log(error)
            });
    }


    useEffect(() => {
        const getCategories = async () => {
            await apiClient.get('/categories').then((res) => {
                setCategories(res.data)
            }).catch((error) => {
                console.log(error)
            });
        }
        getCategories();

    }, [])

    useEffect(() => {
        const getDepartaments = async () => {
            await apiClient.get('/departments').then((res) => {
                setDepartaments(res.data)
            }).catch((error) => {
                console.log(error)
            });
        }
        getDepartaments();

    }, [])

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

        if (isLoggedIn === false) {
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

        if (products !== null) {
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

                <div className="container-sm">
                    <nav className="navbar">
                        <div className="container-fluid" >


                            <div class="container-fluid">

                                <form class="d-flex" role="search">
                                    <input class="form-control me-2" type="search" placeholder="Buscar Producto" aria-label="Buscador" onChange={(e) => setname(e.target.value)}></input>
                                    
                                </form>
                            </div>



                            <div className="form-group row mt-sm-5">
                                <div className="col-sm-2 col-md-2" id="select-filter">
                                    <select className="form-select" placeholder="Categoría" onChange={(e) => setCategory(e.target.value)}>
                                        <option value={0} >todos</option>
                                        {
                                            categories.map((categorie, id) => (
                                                <option key={id} value={categorie.id} >{categorie.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-sm-2 col-md-2" id="select-filter">
                                    <select className="form-select" placeholder="Departamento" onChange={(e) => setDepartment(e.target.value)}>
                                        <option value={0} >todos</option>
                                        {
                                            departaments.map((departament, id) => (
                                                <option key={id} value={departament.id}  >{departament.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-sm-2 col-md-2" id="select-filter">
                                    <select className="form-select" >
                                        <option defaultValue={null} >Estrellas de vendedor</option>
                                    </select>
                                </div>
                                <div className="col-sm-2 col-md-2" id="input-filter">
                                    <input className="form-control" type="number" placeholder="Precio mínimo" onChange={(e) => setPricemin(e.target.value)}></input>
                                </div>
                                <div className="col-sm-2 col-md-2" id="input-filter">
                                    <input className="form-control" type="number" placeholder="Precio máximo" onChange={(e) => setPricemax(e.target.value)}></input>
                                </div>
                                <div className="col-sm-1 col-md-1" id="button-filter">
                                    <button className="btn btn-primary" onClick={() => filter()} >
                                        <i className="material-icons" >search</i>
                                    </button>
                                </div>
                                <div className="col-sm-1 col-md-1" id="button-filter">
                                    <button className="btn btn-primary" onClick={() => filter()} >
                                        <i className="material-icons" >clear_all</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="container-md">
                    <div className="container home">
                        <div>
                            <div className="row">
                                <div className="col-6">
                                    <select className="form-select" value={sortBy} onChange={handleSortByChange}>
                                        <option value="">Ordenar por...</option>
                                        <option value="createdAt">Fecha de Publicacion</option>
                                        <option value="price">Precio</option>
                                        <option value="name">Nombre</option>
                                    </select>
                                </div>
                                {/* Select para seleccionar el orden de ordenamiento */}
                                <div className="col-6">
                                    <select className="form-select" value={sortOrder} onChange={handleSortOrderChange}>
                                        <option value="">De Forma...</option>
                                        <option value="asc">Ascendente</option>
                                        <option value="desc">Descendente</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid-container">
                            {/* Renderizado de los productos ordenados */}
                            {sortProducts(products).map((product, id) => {
                                if (product.name && product.name.toLowerCase().includes(name.toLowerCase())) {
                                    return (
                                        <HomeProductCard
                                            key={id}
                                            id={product.id}
                                            userId={userId}
                                            name={product.name}
                                            price={product.price.toLocaleString()}
                                            createdAt={product.createdAt}
                                            urlDetalles={`/productDetail/${product.id}`}
                                            path={product.photos}
                                            idSeller={product.userIdFK}
                                            nameSeller={product.userFirstName + ' ' + product.userLastName}
                                            isWhisListStatusInclude={true}
                                            heart={product.isProductInWishList}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    if (isWhisListStatusInclude === false) {
        return (
            <div>



                <div className="container-sm">
                    <nav className="navbar">
                        <div className="container-fluid" >

                            <div class="container-fluid">

                                <form class="d-flex" role="search">
                                    <input class="form-control me-2" type="search" placeholder="Buscar Producto" aria-label="Buscador" onChange={(e) => setname(e.target.value)}></input>
                                    
                                </form>
                            </div>
                            <div className="form-group row mt-sm-5">
                                <div className="col-sm-2 col-md-2">
                                    <select className="form-select" placeholder="Categoría" onChange={(e) => setCategory(e.target.value)}>
                                        <option value={0} >todos</option>
                                        {
                                            categories.map((categorie, id) => (
                                                <option key={id} value={categorie.id} >{categorie.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-sm-2 col-md-2">
                                    <select className="form-select" placeholder="Departamento" onChange={(e) => setDepartment(e.target.value)}>
                                        <option value={0} >todos</option>
                                        {
                                            departaments.map((departament, id) => (
                                                <option key={id} value={departament.id}  >{departament.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-sm-2 col-md-2">
                                    <select className="form-select" >
                                        <option defaultValue={null} >Estrellas de vendedor</option>
                                    </select>
                                </div>
                                <div className="col-sm-2 col-md-2">
                                    <input className="form-control" type="number" placeholder="Precio mínimo" onChange={(e) => setPricemin(e.target.value)}></input>
                                </div>
                                <div className="col-sm-2 col-md-2">
                                    <input className="form-control" type="number" placeholder="Precio máximo" onChange={(e) => setPricemax(e.target.value)}></input>
                                </div>
                                <div className="col-sm-1 col-md-1">
                                    <button className="btn btn-primary" onClick={() => filter()} >
                                        <i className="material-icons" >search</i>
                                    </button>
                                </div>
                                <div className="col-sm-1 col-md-1">
                                    <button className="btn btn-primary" onClick={() => filter()} >
                                        <i className="material-icons" >clear_all</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="container-md">
                    <div className="container home">
                        <div>
                            <div className="row">
                                <div className="col-6">
                                    <select className="form-select" value={sortBy} onChange={handleSortByChange}>
                                        <option value="">Ordenar por...</option>
                                        <option value="createdAt">Fecha de Publicacion</option>
                                        <option value="price">Precio</option>
                                        <option value="name">Nombre</option>
                                    </select>
                                </div>
                                {/* Select para seleccionar el orden de ordenamiento */}
                                <div className="col-6">
                                    <select className="form-select" value={sortOrder} onChange={handleSortOrderChange}>
                                        <option value="">De Forma...</option>
                                        <option value="asc">Ascendente</option>
                                        <option value="desc">Descendente</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid-container">
                            {/* Renderizado de los productos ordenados */}
                            {sortProducts(products).map((product, id) => {
                                if (product.name && product.name.toLowerCase().includes(name.toLowerCase())) {
                                    return (
                                        <HomeProductCard
                                            key={id}
                                            id={product.id}
                                            userId={userId}
                                            name={product.name}
                                            price={product.price.toLocaleString()}
                                            createdAt={product.createdAt}
                                            urlDetalles={`/productDetail/${product.id}`}
                                            path={product.photos}
                                            idSeller={product.userIdFK}
                                            nameSeller={product.userFirstName + ' ' + product.userLastName}
                                            isWhisListStatusInclude={true}
                                            heart={product.isProductInWishList}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default Home;
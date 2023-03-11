import React from "react";
import { useEffect, useState } from 'react';
import apiClient from "../../utils/apiClient";
import { Carousel } from "react-bootstrap";
import { event } from "jquery";

const ProductDetail = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");

    //Validate
    //Estos datos son los necesarios para guardar
    const validateName = () => {
        return name.trim() !== "";
    };
    const validateDescription = () => {
        return description.trim() !== "";
    };
    const validatePrice = () => {
        return price > 0;
    };

    //Variable para guardar Producto
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = [
            name,
            price,
            description,
            photo
        ];
    };


    return (
        <div className="container-sm">
            <div className="row align-items-start">
                <div className="col-sm-12 col-md-12 col-lg-6">
                    <div id="carouselExampleIndicators" className="carousel slide">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner" style={{ height: '600px' }}>
                            <div className="carousel-item active">
                                <img src={process.env.PUBLIC_URL + '/logo512.png'} className="d-block w-100" alt="..." style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="carousel-item">
                                <img src={process.env.PUBLIC_URL + '/unnamed.jpg'} className="d-block w-100" alt="..." style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="carousel-item">
                                <img src={process.env.PUBLIC_URL + '/1.png'} className="d-block w-100" alt="..." style={{ objectFit: 'cover' }} />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                </div>
                <div className="col-sm-10 col-md-10 col-lg-6 productDetailText">
                    <h2>Nombre del producto</h2>
                    <p>Vendedor: Nombre del vendedor</p>
                    <h3>Precio: $XXX</h3>
                    <p>Ubicación: Ciudad, Estado</p>
                    <p>Estado del producto: Nuevo/Usado</p>
                    <button type="button" className="btn btn-secondary">Agregar a Lista de Deseos</button>
                </div>
            </div>
        </div>

    )

}

export default ProductDetail;
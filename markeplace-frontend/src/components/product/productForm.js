import React from 'react';
import { useState, useEffect } from "react";
import apiClient from '../../services/apiClient';
import '../../style/style-productForm.css'


function ProductForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("new");
    const [inputFiles, setInputFiles] = useState('');
    const [photos, setPhotos] = useState([]);
    const [category, setCategory] = useState("");
    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        apiClient.get('api/categories').then((response) => {
            setCategoryOptions(response.data);
        })
    }, []);

    const loadFiles = (e) => {
        setInputFiles(e.target.value)
        var files = [];

        for (let i = 0; i < e.target.files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[i]);
            reader.onload = function () {
                files.push(
                    {
                        'name': i,
                        'base64Image': reader.result
                    }
                );
            };
        }
        setPhotos(files);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient.post('api/createProduct', {
            name: name,
            description: description,
            price: price,
            photos: photos,
            status: status,
            userIdFK: 1,
            categoryIdFK: category
        }).then((response) => {
            console.log(response);
        })

    };

    return (
        <div >
            <div className='box-productForm'>
                <div className='card-body-productForm' >
                    <h2>Registro de Producto</h2>
                    <p></p>
                    <form onSubmit={handleSubmit} className="row" encType="multipart/form-data">
                        <div className="col-6">
                            <label className="form-label" htmlFor="name">
                                Nombre
                            </label>
                            <input
                                value={name}
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                required
                                // pattern='/([\w \,\+\-\/\#\$\(\)]+)/'
                                onChange={(e) => setName(e.target.value)}>
                            </input>
                        </div>

                        <div className="col-6">
                            <label className="form-label" htmlFor="price">
                                Precio
                            </label>
                            <input
                                value={price}
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                min="0"
                                step="0.01"
                                required
                                // pattern='/(0\.((0[1-9]{1})|([1-9]{1}([0-9]{1})?)))|(([1-9]+[0-9]*)(\.([0-9]{1,2}))?)/'
                                onChange={(e) => setPrice(e.target.value)}
                            ></input>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="description">
                                Descripción
                            </label>
                            <textarea
                                value={description}
                                className="form-control"
                                id="description"
                                name="description"
                                rows="3"
                                required
                                // pattern='/([a-zA-Z \.\(\)0-9 \, \:\-\+\=\!\$\%\&\*\?\"\"\{\}\n\<\>\?\¿]+)//'
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="col-6">
                            <label className="form-label" htmlFor="status">
                                Estado
                            </label>
                            <select
                                value={status}
                                className="form-control"
                                id="status"
                                name="status"
                                required
                                onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Selecciona una opción</option>
                                <option value="Nuevo">Nuevo</option>
                                <option value="Usado">Usado</option>
                            </select>
                        </div>

                        <div className="col-6">
                            <div className='form-group'>
                                <label className="form-label" htmlFor="category">
                                    Categoría
                                </label>
                                <select
                                    value={category}
                                    className="form-control"
                                    id="category"
                                    name="category"
                                    required
                                    onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Selecciona una opción</option>
                                    {
                                        categoryOptions.map((category) =>
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        )}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="photos">
                                Fotos
                            </label>
                            <input
                                value={inputFiles}
                                className="form-control"
                                required
                                type="file"
                                id="photos"
                                name="photos"
                                accept=".png, .jpeg, .jpg"
                                multiple
                                onChange={loadFiles}>
                            </input>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-success">
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
}
export default ProductForm
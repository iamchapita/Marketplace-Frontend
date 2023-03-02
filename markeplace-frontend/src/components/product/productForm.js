import React from 'react';
import { useState } from "react";
import '../../style/style-productForm.css'


function ProductForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("new");
    const [photos, setPhotos] = useState([]);
    const [category, setCategory] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div >
            <div className='box-productForm'>
                <div className='card-body-productForm' >
                    <h2>Registro de Producto</h2>
                    <p></p>
                    <form onSubmit={handleSubmit} className="row">
                        <div className="col-6">
                            <label className="form-label" for="name">
                                Nombre
                            </label>
                            <input
                                value={name}
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                required
                                pattern='/([\w \,\+\-\/\#\$\(\)]+)/'
                                onChange={(e) => setName(e.target.value)}>
                            </input>
                        </div>

                        <div className="col-6">
                            <label className="form-label" for="price">
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
                                pattern='/(0\.((0[1-9]{1})|([1-9]{1}([0-9]{1})?)))|(([1-9]+[0-9]*)(\.([0-9]{1,2}))?)/'
                                onChange={(e) => setPrice(e.target.value)}
                            ></input>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" for="description">
                                Descripción
                            </label>
                            <textarea
                                value={description}
                                className="form-control"
                                id="description"
                                name="description"
                                rows="3"
                                required
                                pattern='/([a-zA-Z \.\(\)0-9 \, \:\-\+\=\!\$\%\&\*\?\"\"\{\}\n\<\>\?\¿]+)//'
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="col-6">
                            <label className="form-label" for="status">
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
                                <label className="form-label" for="category">
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
                                    <option value="Categoria 1">Categoria 1</option>
                                    <option value="Categoria 2">Categoria 2</option>
                                    <option value="Categoria 3">Categoria 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" for="photos">
                                Fotos
                            </label>
                            <input
                                value={photos}
                                className="form-control"
                                required
                                type="file"
                                id="photos"
                                name="photos"
                                accept="image/png,image/jpeg,image/jpg"
                                multiple
                                onChange={(e) => setPhotos(e.target.value)}>
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
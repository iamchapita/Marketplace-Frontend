import React from "react";
import { useState } from "react";

const ProductForm = () => {
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
    <div>
      <h2>Registro de Producto</h2>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label className="form-label" for="name">
            Nombre
          </label>
          <input
            value={name}
            type="text"
            class="form-control"
            id="name"
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div class="form-group">
          <label className="form-label" for="description">
            Descripción
          </label>
          <textarea
            value={description}
            class="form-control"
            id="description"
            name="description"
            rows="3"
            required
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div class="form-group">
          <label className="form-label" for="price">
            Precio
          </label>
          <input
            value={price}
            type="number"
            class="form-control"
            id="price"
            name="price"
            min="0"
            step="0.01"
            required
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        <div class="form-group">
          <label className="form-label" for="status">
            Estado
          </label>
          <select
            value={status}
            class="form-control"
            id="status"
            name="status"
            required
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Selecciona una opción</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Usado">Usado</option>
          </select>
        </div>
        <div class="form-group">
          <label className="form-label" for="photos">
            Fotos
          </label>
          <input
            value={photos}
            required
            type="file"
            class="form-control-file"
            id="photos"
            name="photos"
            accept="image/png,image/jpeg,image/jpg"
            multiple
            onChange={(e) => setPhotos(e.target.value)}
          ></input>
        </div>
        <div class="form-group">
          <label className="form-label" for="category">
            Categoría
          </label>
          <select
            value={category}
            class="form-control"
            id="category"
            name="category"
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecciona una opción</option>
            <option value="Categoria 1">Categoria 1</option>
            <option value="Categoria 2">Categoria 2</option>
            <option value="Categoria 3">Categoria 3</option>
          </select>
        </div>
        <button type="submit" class="btn btn-success">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

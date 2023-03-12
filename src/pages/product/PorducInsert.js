import React from "react";

import { useEffect, useState } from 'react';
import apiClient from "../../utils/apiClient";
import { Form } from "react-router-dom";

const ProductInsert= () => {
    const [name,setName]=useState("");
    const [price,setPrice]=useState("")
    const [description,setDescription]=useState("");
    const [photo,setPhoto]=useState("");
    const [category,setCategory]=useState("");

    //Validate
    //Estos datos son los necesarios para guardar
    const validateName =()=>{
        return name.trim() !=="";
    };
    const validateDescription =()=>{
        return description.trim() !=="";
    };
    const validatePrice = () => {
        return price > 0;
      };
      const validateCategory =()=>{
        return description.trim() !=="";
    };

    //Variable para guardar Producto
    const handleSubmit =async (event)=>{
        event.preventDefault();
        if (!validateName() || !validateDescription() || !validatePrice() || !validateCategory()) {
            return;
          }
      
          const formData = new FormData();
          formData.append("name", name);
          formData.append("price", price);
          formData.append("description", description);
          formData.append("photo", photo);
          formData.append("category", category);
      
          try {
            const response = await apiClient.post("/products", formData);
            console.log("Product saved:", response.data);
          } catch (error) {
            console.error("Error saving product:", error);
          }
    };
    return (
        <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {!validateName() && <p>El nombre no puede estar vacío</p>}
      </div>
      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        {!validateDescription() && (
          <p>La descripción no puede estar vacía</p>
        )}
      </div>
      <div>
      <label htmlFor="price">Precio:</label>
      <input
        type="text"
        id="price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
      {!validatePrice() && (
        <p>El precio debe ser un número con dos decimales como máximo</p>
      )}
    </div>
    <div>
      <label htmlFor="photo">Foto:</label>
      <input
        type="file"
        id="photo"
        onChange={(event) => setPhoto(event.target.files[0])}
      />
    </div>
    <button type="submit">Guardar</button>
  </Form>
);
}

export default ProductInsert;;


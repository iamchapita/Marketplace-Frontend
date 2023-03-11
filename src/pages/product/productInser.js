import React from "react";
import { useEffect, useState } from 'react';
import apiClient from "../../utils/apiClient";
import { Carousel } from "react-bootstrap";
import { event } from "jquery";

const ProductDetail = () => {
    const [name,setName]=useState("");
    const [price,setPrice]=useState("")
    const [description,setDescription]=useState("");
    const [photo,setPhoto]=useState("");

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

    //Variable para guardar Producto
    const handleSubmit =(event)=>{
        event.preventDefault();
        const data =[
            name,
            price,
            description,
            photo
        ];
    };
};
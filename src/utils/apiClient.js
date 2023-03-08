// -*- coding: utf-8 -*- 
/*
@author: lamorales@unah.hn || alejandrom646@gmail.com ||iamchapita
@date: 2023/02/26
@version: 0.1.0
*/

import axios from "axios";
import { redirect } from "react-router-dom";

// Configuración de Axios
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

// Interceptor para actualizar el token de autenticación en caso que este haya 'vencido'
apiClient.interceptors.request.use(async (config) => {

    const token = localStorage.getItem('access_token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

},
    error => {
        return Promise.reject(error);
    });

export default apiClient;

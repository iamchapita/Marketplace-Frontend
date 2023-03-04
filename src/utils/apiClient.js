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
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (accessToken && refreshToken) {
        try {
            const { data } = await apiClient.post('/token/refresh', { refresh_token: refreshToken });
            localStorage.setItem('access_token', data.access_token);
            config.headers.Authorization = `Bearer ${data.access_token}`;
        } catch (error) {
            console.error('Error refreshing token:', error);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            <redirect to='/login'/>
        }
    }
    return config;
});

export default apiClient;

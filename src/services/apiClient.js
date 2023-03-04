// -*- coding: utf-8 -*- 
/*
@author: lamorales@unah.hn || alejandrom646@gmail.com ||iamchapita
@date: 2023/02/26
@version: 0.1.0
*/

import axios from "axios";

// Configuración de Axios
const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

// Interceptor para actualizar el token de autenticación en caso que este haya 'vencido'
apiClient.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (accessToken && refreshToken) {
        try {
            const { data } = await apiClient.post('/api/token/refresh', { refresh_token: refreshToken });
            localStorage.setItem('access_token', data.access_token);
            config.headers.Authorization = `Bearer ${data.access_token}`;
        } catch (error) {
            console.error('Error refreshing token:', error);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            // Redirigir a la página de inicio de sesión o mostrar una ventana modal para que el usuario inicie sesión nuevamente
        }
    }
    return config;
});

export default apiClient;
// // Ejemplo de uso de Axios
// async function getData() {
//     try {
//         const { data } = await axiosInstance.get('/api/data');
//         console.log('Data:', data);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         // Si el token de autenticación expiró y no se pudo actualizar, redirigir a la página de inicio de sesión o mostrar una ventana modal para que el usuario inicie sesión nuevamente
//     }
// }
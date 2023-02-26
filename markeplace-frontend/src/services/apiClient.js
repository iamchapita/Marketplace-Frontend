// -*- coding: utf-8 -*- 
/*
@author: lamorales@unah.hn || alejandrom646@gmail.com ||iamchapita
@date: 2023/02/26
@version: 0.1.0
*/

import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
})

export default apiClient;
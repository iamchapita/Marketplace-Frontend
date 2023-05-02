import React, { useState, useEffect } from "react";

import CustomizableAlert from "../../../../components/CustomizableAlert";
import apiClient from "../../../../utils/apiClient";
import { YAxis, Line, CartesianGrid, ComposedChart, BarChart, XAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';


const StatisticsModule = ({ isLoggedIn, isAdmin, areUserStatusLoaded }) => {
    const [products, setProducts] = useState([]);
    const [gradit, setGrafic] = useState([]);
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await apiClient.get('/getProductsInsertadosMes');
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, []);


    if (areUserStatusLoaded) {

        if (!isLoggedIn) {
            return (
                <div>
                    <CustomizableAlert title={'Error'} text={'No tienes Autorización para acceder a este recurso.'} />
                </div>
            );
        }

        if (isAdmin) {
            return (
                <div>
                    <CustomizableAlert title={'Error'} text={'No tienes Autorización para acceder a este recurso.'} />
                </div>
            );
        }

        const handleButtonClick = async () => {
            const res = await apiClient.get("/getProductsInsertadosMes");
            setProducts(res.data);
            setShowChart(!showChart);
        };


        return (
            <div>
                <button onClick={handleButtonClick}>Mostrar y Ocultar gráfico</button>

                {/* Graficas de productos Por departamento */}
                {showChart && (
                    <div>
                        {/* Graficas de productos Insertados */}
                        <h2>Grafica de Productos Registrados</h2>
                        <BarChart
                            data={products}
                            width={500}
                            height={300}>
                            <XAxis dataKey="nombre_mes" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Bar dataKey="dia" fill="#8884d8" barSize={30} />
                            <Bar dataKey="Nombre" fill="#8884d8" barSize={30} />
                            <Bar dataKey="anio" fill="#8884d8" barSize={30} />
                        </BarChart>

                    </div>
                )}

            </div>

        );
    }
}
export default StatisticsModule;
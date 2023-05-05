import React, { useState, useEffect } from "react";

import CustomizableAlert from "../../../../components/CustomizableAlert";
import apiClient from "../../../../utils/apiClient";
import { Area, YAxis, Line, CartesianGrid, ComposedChart, BarChart, XAxis, Bar, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const StatisticsModule = ({ isLoggedIn, isAdmin, areUserStatusLoaded }) => {
    const [products, setProducts] = useState([]);
    const [gradit, setGrafic] = useState([]);
    const [showChart, setShowChart] = useState(false);

    const [sales, setSales] = useState([]);

    const [showChart1, setShowChart1] = useState(false);

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

    useEffect(() => {
        const getSales = async () => {
            try {
                const response = await apiClient.get('/getProductoVendidos');
                setSales(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getSales();
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

        const handleButtonClickSale = async () => {
            const res = await apiClient.get("/getProductoVendidos");
            setSales(res.data);
            setShowChart1(!showChart1);
        };


        const COLORS = ['#FF69B4', '#1E90FF', '#00CC00', '#800080', '#8B4513', '#FFD700'];




        return (
            <div>
                <div>
                    <button onClick={handleButtonClick}>Mostrar y Ocultar Gráfico de Registro</button>

                    {/* Graficas de productos Por departamento */}
                    {showChart && (
                        <div>
                            {/*
                            <div className="bg-white">
                                {/* Graficas de productos Insertados
                                <h2>Gráfica de Productos Registrados</h2>
                                <BarChart
                                    data={products}
                                    width={600}
                                    height={300}>
                                    <XAxis dataKey="nombre_mes" stroke="#8884d8" />
                                    <YAxis />
                                    <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <Bar dataKey="Día" fill="#8884d8" barSize={30} />
                                    <Bar dataKey="Nombre" fill="#8884d8" barSize={30} />
                                    <Bar dataKey="Año" fill="#8884d8" barSize={30} />
                                    <Line type="monotone" dataKey="Día" stroke="#ff7300" />

                                </BarChart>


                            </div> */}

                            <div>
                                <h3>Total de Productos Registrados por Mes</h3>
                                <div>
                                    {products.length > 0 ? (
                                        <PieChart width={600} height={300}>
                                            <Pie
                                                data={products}
                                                dataKey="total_productos"
                                                nameKey="nombre_mes"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                fill="#8884d8"
                                                label={(entry) => entry.nombre_mes}
                                            >
                                                {products.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Legend />
                                            <Tooltip />
                                        </PieChart>
                                    ) : (
                                        <div>Cargando datos...</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Graficas de productos vendidos por departamentos  */}
                <div>
                    <button onClick={handleButtonClickSale}>Mostrar y Ocultar Gráfico Ventas</button>

                    {/* Graficas de productos Por departamento */}
                    {showChart1 && (
                        <div className="bg-white">
                            {/* Graficas de productos Insertados */}
                            <h2>Gráfica de Productos Vendidos</h2>
                            <BarChart width={600} height={300} data={sales}>
                                <XAxis dataKey="departamento" stroke="#1E90FF" />

                                <YAxis />
                                <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />

                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <Bar dataKey="Nombre" fill="#800080" barSize={30} />
                                <Bar dataKey="Total_ProductosVendidos" fill="#1E90FF" barSize={30} />

                            </BarChart>
                        </div>
                    )}

                </div>


            </div>

        );
    }
}
export default StatisticsModule;
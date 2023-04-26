import React, { useState, useEffect, } from "react";

const Suscription = ({ isLoggedIn }) => {
     
    const [aplicarActive, setAplicarActive] = useState(true);

    const handleAplicarClick = () => {
      setAplicarActive(false);
    };
  
    const handleBorrarClick = () => {
      setAplicarActive(true);
    };

    return (
        <div className="container-sm">
            <div className="tittle">
            <h1>Suscripciones de Categorias</h1>
            </div>
            <div>
                <table>
                    <thead>
                        <th>Categorias</th>
                        <th>Suscripcion</th>
                    </thead>
                    <tbody>
                        <td>
                            Lista de Categorias
                        </td>
                        <td>
                        <div className="form-check form-switch d-flex justify-content-center">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                        </div>
                        </td>
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default Suscription;
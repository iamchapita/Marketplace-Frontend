import React, { useState } from "react";

function UserAgreement() {
  const [aceptado, setAceptado] = useState(false);
  const [denegado, setDenegado] = useState(false);

  const handleAceptar = () => {
    setAceptado(true);
  };

  const handleDenegar = () => {
    setDenegado(true);
  };

  return (
    <div>
    <div className="box">
      <div className="card-body">
        <div className='agreement'>
            <h5>Acuerdo de usuario</h5>
            <h6>Por favor, lee atentamente el acuerdo de usuario antes de continuar:</h6>
            <h6>...Me Falta Escribir el Acuerdo...</h6> 

                {!aceptado && !denegado && (
                <div>
                <button onClick={handleAceptar} className='btn btn-secondary' type="submit">Aceptar</button>
                <button onClick={handleDenegar} className='btn btn-secondary' type="submit">Denegar</button>
                </div>
                )}
                        
           {aceptado && <h6>Has aceptado el acuerdo de usuario.</h6>}
           {denegado && <h6>Has denegado el acuerdo de usuario.</h6>}
        </div>
      </div>  
    </div>
    </div>
  );
}

export default UserAgreement;

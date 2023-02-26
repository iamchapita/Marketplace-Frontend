import React, { useState } from "react";

function AcuerdoUsuario() {
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
      <h2>Acuerdo de usuario</h2>
      <p>Por favor, lee atentamente el acuerdo de usuario antes de continuar:</p>
      <p>...Me Falta Escribir el Acuerdo...</p> 

      {!aceptado && !denegado && (
        <div>
          <button onClick={handleAceptar}>Aceptar</button>
          <button onClick={handleDenegar}>Denegar</button>
        </div>
      )}
      
      {aceptado && <p>Has aceptado el acuerdo de usuario.</p>}
      {denegado && <p>Has denegado el acuerdo de usuario.</p>}
    </div>
  );
}

export default AcuerdoUsuario;

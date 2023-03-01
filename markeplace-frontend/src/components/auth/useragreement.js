import React, { useState } from "react";
import '../../style/style-useragreement.css'

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
    <div className="box-agreement">
      <div >
        <div className='agreement'>
            
                {!aceptado && !denegado && (

                <div className="form-check">
                <a className="text-link" href="/acuerdo" >Acuerdo de usuario</a>
                <p>Por favor, lee atentamente el acuerdo de usuario antes de continuar:</p>
                <form className="row">
                  <div className="col-2">  
                  <input onClick={handleAceptar} id="btn-check-act" className='form-check-input' type="checkbox"/>
                  <label className="form-check-label" for="btn-check-act" >Aceptar</label>
                  </div>
                  <div className="col-2">
                  <input onClick={handleDenegar} id="btn-check-dng" className='form-check-input' type="checkbox"/>
                  <label className="form-check-label" for="btn-check-dng">Denegar</label>
                  </div>
                </form>
                </div>
                )}
                        
           {aceptado && <p>Has aceptado el acuerdo de usuario.</p>}
           {denegado && <p>Has denegado el acuerdo de usuario.</p>}
        </div>
      </div>  
    </div>
    </div>
  );
}

export default UserAgreement;

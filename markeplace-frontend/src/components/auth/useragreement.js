import React, { useState } from "react";
import '../../style/style-useragreement.css'

function UserAgreement({ isDisabled, setIsDisabled }) {

    const handleClick = () => {
        setIsDisabled(!isDisabled);
    };

    return (
        <div>
            <div className='agreement'>
                <div className="form-check">
                    <a className="text-link" href="/acuerdo" >Acuerdo de usuario</a>
                    <p>Por favor, lee atentamente el acuerdo de usuario antes de continuar:</p>
                    <div className="col-2">
                        <input onClick={handleClick} id="btn-check-act" className='form-check-input' type="checkbox"/>
                        <label className="form-check-label" for="btn-check-act" >Aceptar</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserAgreement;

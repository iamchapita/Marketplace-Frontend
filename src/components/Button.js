import React from "react";

const Button = ({ type, fieldLabel, onClick }) => {

    return(
        <button className='btn btn-success'type={type} onClick={onClick}>{fieldLabel}</button>
    );

}

export default Button;
import React from "react";

const Button = ({ type, fieldLabel, onClick, buttonClass = 'success' }) => {

    return (
        <button className={`btn btn-${buttonClass}`} type={type} onClick={onClick}>{fieldLabel}</button>
    );

}

export default Button;
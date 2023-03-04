import React from "react";


const Button = ({ type, fieldName, onClick }) => {

    return(
        <button className='btn btn-success'type={type} onClick={onClick}>{fieldName}</button>
    );

}

export default Button;
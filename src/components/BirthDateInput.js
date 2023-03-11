import React from "react";

const BirthDateInput = ({ fieldLabel, fieldName, inputValue, onChangeHandler, required = true, min = '', max = '' }) => {

    // Obteniendo fechas limite para el input type Date
    var today = new Date();
    // Se obtiene la fecha limite superior. Fecha de mayoria de edad.
    max = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // Se obtiene el limite inferior. Fecha de nacimieneto.
    min = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

    max = max.toISOString().split('T')[0];
    min = min.toISOString().split('T')[0];


    return (
        <div className="input-group mb-3">
            <label className="input-group-text" htmlFor={fieldName}>{fieldLabel}</label>
            <input type='date' className='date form-control' name={fieldName} autoComplete='off' value={inputValue} onChange={onChangeHandler} min={min} max={max} required />
        </div>
    );
}

export default BirthDateInput;
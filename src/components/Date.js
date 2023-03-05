import React from "react";

const Date = ({ fieldLabel, fieldName, inputValue, onChangeHandler, required = true, min = '1923-01-01', max = '2005-01-01' }) => {

    if(required){
        return (
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor={fieldName}>{fieldLabel}</label>
                <input type='date' className='date form-select' name={fieldName} autoComplete='off' value={inputValue} onChange={onChangeHandler} min={min} max={max} required/>
            </div>
        );
    }else{
        return (
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor={fieldName}>{fieldLabel}</label>
                <input type='date' className='date form-select' name={fieldName} autoComplete='off' value={inputValue} onChange={onChangeHandler} min={min} max={max}/>
            </div>
        );
    }
}

export default Date;
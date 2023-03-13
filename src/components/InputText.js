import React from "react";

const InputText = ({ type, fieldLabel, fieldName, placeholder, inputValue, onChangeHandler, required = true, isValid = true, step = false }) => {

    if (required) {
        return (
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">{fieldLabel}</span>
                <input type={type} className={`form-control ${isValid ? '' : "invalid"}`} placeholder={placeholder} aria-label={fieldName} name={fieldName} aria-describedby={fieldName} value={inputValue} autoComplete="off" required onChange={onChangeHandler} step={step ? '0.01' : ''} />
            </div>
        );
    } else {
        return (
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">{fieldLabel}</span>
                <input type={type} className={`form-control ${isValid ? '' : "invalid"}`} placeholder={placeholder} aria-label={fieldName} name={fieldName} aria-describedby={fieldName} value={inputValue} autoComplete="off" onChange={onChangeHandler} step={step ? '0.01' : ''} />
            </div>
        );
    }
}

export default InputText;
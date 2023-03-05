import React from "react";

const InputText = ({ type, fieldLabel, fieldName, placeholder, inputValue, onChangeHandler, required = true }) => {

    if (required) {
        return (
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">{fieldLabel}</span>
                <input type={type} className="form-control" placeholder={placeholder} aria-label={fieldName} name={fieldName} aria-describedby={fieldName} value={inputValue} autoComplete="off" required onChange={onChangeHandler}/>
            </div>
        );
    } else {
        return (
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">{fieldLabel}</span>
                <input type={type} className="form-control" placeholder={placeholder} aria-label={fieldName} name={fieldName} aria-describedby={fieldName} value={inputValue} autoComplete="off" onChange={onChangeHandler}/>
            </div>
        );
    }
}

export default InputText;
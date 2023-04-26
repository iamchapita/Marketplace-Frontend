import React from "react";

const TextArea = ({ fieldLabel, fieldName, placeholder, inputValue, onChangeHandler, required = true, disabled = false, isValid = true }) => {

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">{fieldLabel}</span>
            <textarea rows="3" className={`form-control ${isValid ? '' : "invalid"}`} placeholder={placeholder} aria-label={fieldName} name={fieldName} aria-describedby={fieldName} value={inputValue} autoComplete="off" required={required} onChange={onChangeHandler} disabled={disabled}></textarea>
        </div>
    );

}

export default TextArea;
import React from "react";

const InputFile = ({ type, fieldLabel, fieldName, placeholder, inputValue, onChangeHandler, accept = ['*/*'], required = true, disabled = false, isValid = true }) => {

    return (
        <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupFile01">{fieldLabel}</label>
            <input type={type} className={`form-control ${isValid ? '' : "invalid"}`} id="formFileMultiple" placeholder={placeholder} aria-label={fieldName} name={fieldName} aria-describedby={fieldName} autoComplete="off" required={required} multiple onChange={onChangeHandler} disabled={disabled} accept={accept.length > 0 ? accept.map((value) => value) : accept[0]} />
        </div>
    );

}

export default InputFile;
import React from "react";

const Checkbox = ({ fieldLabel, fieldName, checkedValue, onChangeHandler, required = true }) => {

    if (required) {
        return (
            <div className="mb-3 form-check">
                <label className="form-check-label" htmlFor={fieldName}>{fieldLabel}</label>
                <input type="checkbox" className="form-check-input" checked={checkedValue} onChange={onChangeHandler} required/>
            </div>
        );
    } else {
        return (
            <div className="mb-3 form-check">
                <label className="form-check-label" htmlFor={fieldName}>{fieldLabel}</label>
                <input type="checkbox" className="form-check-input" checked={checkedValue} onChange={onChangeHandler} />
            </div>
        );
    }
}

export default Checkbox;
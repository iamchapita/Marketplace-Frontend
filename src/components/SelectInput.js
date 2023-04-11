import React from "react";

const SelecInput = ({ fieldLabel, fieldName, firstOptionValue, optionsValues, inputValue, onChangeHandler, required = true }) => {

    return (
        <div className="input-group mb-3">
            <div className="input-group mb-3">
                <label className='input-group-text'>{fieldLabel}</label>
                <select className='form-control'
                    name={fieldName}
                    type="list"
                    value={inputValue}
                    onChange={onChangeHandler}
                    required={required}
                >
                    <option value="">{firstOptionValue}</option>
                    {optionsValues.map((optionValue) => (
                        <option key={optionValue.id} value={optionValue.id}>{optionValue.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default SelecInput;
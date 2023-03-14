import React from "react";

const SelecInput = ({ fieldLabel, fieldName, firstOptionValue, optionsValues, inputValue, onChangeHandler, required = true }) => {

    if (required) {
        return (
            <div className="input-group mb-3">
                <label className='input-group-text'>{fieldLabel}</label>
                <select className='form-control'
                    name={fieldName}
                    type="list"
                    value={inputValue}
                    required
                    onChange={onChangeHandler}
                >
                    <option value="">{firstOptionValue}</option>
                    {optionsValues.map((optionValue) => (
                        <option key={optionValue.id} value={optionValue.id}>{optionValue.value}</option>
                    ))}
                </select>
            </div>
        );
    } else {
        return (
            <div className="input-group mb-3">
                <div className="input-group mb-3">
                    <label className='input-group-text'>{fieldLabel}</label>
                    <select className='form-control'
                        name={fieldName}
                        type="list"
                        value={inputValue}
                        onChange={onChangeHandler}
                    >
                        <option value="">{firstOptionValue}</option>
                        {optionsValues.map((optionValue) => (
                            <option key={optionValue.id} value={optionValue.id}>{optionValue.value}</option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }
}

export default SelecInput;
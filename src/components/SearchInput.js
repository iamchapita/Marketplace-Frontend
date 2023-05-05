import React, { useState } from "react";
import apiClient from "../utils/apiClient";

const SearchInput = ({ fieldName, placeholder, url, regex, registerPerPageValue, setIsReadyToRender, setDataToRender, setPaginateLinks }) => {

    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(null);

    const action = async (registersAmount, value) => {

        setIsReadyToRender(false);

        await apiClient.get(`${url}/${registersAmount}/${value}`).then((response) => {
            setDataToRender(response.data.data);
            setPaginateLinks(response.data.links);
            setIsReadyToRender(true);
        }).catch((error) => {
            console.log(error);
        });

    }

    const onChangeEventHandler = (e) => {
        setInputValue(e.target.value);
        if (regex.test(e.target.value)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    return (
        <div className="input-group input-group-md">
            <input type="text" style={{ marginTop: '0.1em', height: '2.4em' }} className={`form-control ${isValid !== null ? (isValid == false ? 'invalid' : '') : null}`} placeholder={placeholder} aria-label={fieldName} name={fieldName} aria-describedby={fieldName} onChange={onChangeEventHandler} value={inputValue} />
            <button type="submit" className="btn btn-secondary" onClick={() => { action(registerPerPageValue, inputValue) }}>Buscar</button>
        </div>
    );
}

export default SearchInput;
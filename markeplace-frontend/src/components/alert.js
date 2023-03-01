import React from "react";

const Alert = ({ text, showAlert, setShowAlert }) => {

    if (showAlert) {
        return (
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Ups!</strong> {text}
                <button type="button" class="btn-close" onClick={() => setShowAlert(false)} data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        );
    } else {
        return (<div></div>);
    }
}


export default Alert;

import React from "react";

const Alert = ({ text, showAlert, setShowAlert, type = 'danger' }) => {

    if (showAlert) {
        return (
            <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
                <strong>Ups!</strong><p dangerouslySetInnerHTML={{__html: text}}></p>
                <button type="button" className="btn-close" onClick={() => setShowAlert(!showAlert)} data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        );
    }
}

export default Alert;
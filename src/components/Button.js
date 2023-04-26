import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Button = ({ type, fieldLabel, onClick, buttonClass = 'success', tooltipText = '', disabled = false }) => {

    if (tooltipText.length > 0) {
        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                {tooltipText}
            </Tooltip>
        );

        return (
            <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
                <button className={`btn btn-${buttonClass}`} type={type} onClick={onClick} disabled={disabled ? 'disabled' : ''} >{fieldLabel} </button>
            </OverlayTrigger>
        );
    } else {
        return (
            <button className={`btn btn-${buttonClass}`} type={type} onClick={onClick} disabled={disabled ? 'disabled' : ''} >{fieldLabel} </button>
        );
    }
}

export default Button;

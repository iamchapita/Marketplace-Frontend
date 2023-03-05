import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const BootstrapModal = ({ isOpen, onClose, title, content }) => {
    return (
        <Modal show={isOpen} onHide={()=> onClose(false)} backdrop='static' keyboard={false}>
            <Modal.Header closeButton={false}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body dangerouslySetInnerHTML={{__html: content}}/>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BootstrapModal;
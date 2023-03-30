import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ShareButton = () => {
  const [showModal, setShowModal] = useState(false);
  
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('¡Enlace copiado al portapapeles!');
    handleCloseModal();
  }
  
  const handleShareWhatsapp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`);
    handleCloseModal();
  }
  
  return (
    <>
      <Button variant="primary" onClick={handleShowModal}>
        Compartir
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Compartir enlace</Modal.Title>
        </Modal.Header>
        <Modal.Body id='sharebutton'>
          <Button type="button" className="btn btn-primary"  onClick={handleCopyLink}>
            Copiar enlace
          </Button>
          
          <Button type="button" className="btn btn-success"  onClick={handleShareWhatsapp}>
            WhatsApp
          </Button>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShareButton;
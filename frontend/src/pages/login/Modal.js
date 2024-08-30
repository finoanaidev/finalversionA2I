import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ show, handleClose, handleLogin }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Vous êtes candidat ou recruteur ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Veuillez choisir votre profil :</p>
        <Button variant="primary" onClick={() => handleLogin('candidat')}>
          Candidat
        </Button>
        <Button variant="primary" onClick={() => handleLogin('recruteur')}>
          Recruteur
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;

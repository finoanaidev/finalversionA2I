// import React from 'react';
// import { Modal, Button } from 'react-bootstrap';

// const CustomModal = ({ show, handleClose, handleConfirm }) => {
//   const handleConfirmClick = () => {
//     handleConfirm();
//     alert('Ajoutez un autre poste envisagé');
//   };

//   const handleCancelClick = () => {
//     handleClose();
//     alert('Veuillez continuer');
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Avez-vous d'autres postes envisagés ?</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p>Vous avez déjà rempli le poste envisagé. Voulez-vous ajouter d'autres postes envisagés ?</p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleCancelClick}>
//           Non
//         </Button>
//         <Button variant="primary" onClick={handleConfirmClick}>
//           Oui
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default CustomModal;

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CustomModal = ({ show, handleClose, handleConfirm }) => {
  const [showForm, setShowForm] = useState(false);
  const [poste, setPoste] = useState('');
  const [realisation, setRealisation] = useState('');
  const [competence, setCompetence] = useState('');

  const handleConfirmClick = () => {
    setShowForm(true);
  };

  const handleSubmit = () => {
    handleConfirm({ poste, realisation, competence });
    alert('Formulaire soumis avec succès');
    handleClose();
  };

  const handleCancelClick = () => {
    handleClose();
    alert('Veuillez continuer');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Avez-vous d'autres postes envisagés ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showForm ? (
          <Form>
            <Form.Group controlId="formPoste">
              <Form.Label>Poste</Form.Label>
              <Form.Control type="text" placeholder="Entrez le poste" value={poste} onChange={(e) => setPoste(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formRealisation">
              <Form.Label>Réalisation</Form.Label>
              <Form.Control type="text" placeholder="Entrez la réalisation" value={realisation} onChange={(e) => setRealisation(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formCompetence">
              <Form.Label>Compétence</Form.Label>
              <Form.Control type="text" placeholder="Entrez la compétence" value={competence} onChange={(e) => setCompetence(e.target.value)} />
            </Form.Group>
          </Form>
        ) : (
          <p>Vous avez déjà rempli le poste envisagé. Voulez-vous ajouter d'autres postes envisagés ?</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {showForm ? (
          <>
            <Button variant="secondary" onClick={handleCancelClick}>
              Annuler
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Soumettre
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={handleCancelClick}>
              Non
            </Button>
            <Button variant="primary" onClick={handleConfirmClick}>
              Oui
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;

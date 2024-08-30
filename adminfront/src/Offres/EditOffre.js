


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Modal, Button, Form } from 'react-bootstrap';

// const EditOffre = ({ show, handleClose, offreId, refreshOffres }) => {
//   const [offreData, setOffreData] = useState({
//     titre: '',
//     description: '',
//     mission: '',
//     competence: '',
//     atouts: '',
//   });

//   useEffect(() => {
//     const fetchOffre = async () => {
//       if (offreId) {
//         try {
//           const res = await axios.get(`http://localhost:5000/api/sectionOffres/${offreId}`);
//           setOffreData(res.data);
//         } catch (err) {
//           console.error('Erreur lors de la récupération de l\'offre', err);
//         }
//       }
//     };

//     fetchOffre();
//   }, [offreId]);

//   const handleChange = (e) => {
//     setOffreData({
//       ...offreData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/api/sectionOffres/${offreId}`, offreData);
//       refreshOffres(); // Fonction pour rafraîchir la liste des offres
//       handleClose(); // Fermer la modal après la mise à jour
//     } catch (err) {
//       console.error('Erreur lors de la mise à jour de l\'offre', err);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Modifier l'Offre d'Emploi</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formTitre">
//             <Form.Label>Titre</Form.Label>
//             <Form.Control
//               type="text"
//               name="titre"
//               value={offreData.titre}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formDescription">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               type="text"
//               name="description"
//               value={offreData.description}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formMission">
//             <Form.Label>Mission</Form.Label>
//             <Form.Control
//               type="text"
//               name="mission"
//               value={offreData.mission}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formCompetence">
//             <Form.Label>Compétence</Form.Label>
//             <Form.Control
//               type="text"
//               name="competence"
//               value={offreData.competence}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formAtouts">
//             <Form.Label>Atouts</Form.Label>
//             <Form.Control
//               type="text"
//               name="atouts"
//               value={offreData.atouts}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Enregistrer
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default EditOffre;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const EditOffre = ({ show, handleClose, offreId, refreshOffres }) => {
  const [offreData, setOffreData] = useState({
    titre: '',
    description: '',
    mission: '',
    competence: '',
    atouts: '',
  });
  
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchOffre = async () => {
      if (offreId) {
        try {
          const res = await axios.get(`http://localhost:5000/api/sectionOffres/${offreId}`);
          setOffreData(res.data);
        } catch (err) {
          console.error('Erreur lors de la récupération de l\'offre', err);
        }
      }
    };

    fetchOffre();
  }, [offreId]);

  const handleChange = (e) => {
    setOffreData({
      ...offreData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true); // Afficher la confirmation
  };

  const handleConfirmSave = async () => {
    setShowConfirmation(false); // Fermer la confirmation
    try {
      await axios.put(`http://localhost:5000/api/sectionOffres/${offreId}`, offreData);
      refreshOffres(); // Fonction pour rafraîchir la liste des offres
      handleClose(); // Fermer la modal après la mise à jour
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'offre', err);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false); // Fermer la confirmation
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'Offre d'Emploi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitre">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                name="titre"
                value={offreData.titre}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={offreData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMission">
              <Form.Label>Mission</Form.Label>
              <Form.Control
                type="text"
                name="mission"
                value={offreData.mission}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCompetence">
              <Form.Label>Compétence</Form.Label>
              <Form.Control
                type="text"
                name="competence"
                value={offreData.competence}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAtouts">
              <Form.Label>Atouts</Form.Label>
              <Form.Control
                type="text"
                name="atouts"
                value={offreData.atouts}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Enregistrer
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de Confirmation */}
      <Modal show={showConfirmation} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la Sauvegarde</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir enregistrer les modifications ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleConfirmSave}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditOffre;

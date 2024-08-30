// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const EditOffre = () => {
//   const { id } = useParams();
//   const [formData, setFormData] = useState({
//     entreprise: '',
//     poste: '',
//     reference: '',
//     mission: '',
//     description: '',
//     competenceObligatoire: '',
//     competenceSouhaite: '',
//     certificat: '',
//     autre: ''
//   });
//   const [fetchError, setFetchError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOffre = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/recrutements/${id}`);
//         setFormData({
//           entreprise: res.data.entreprise,
//           poste: res.data.poste,
//           reference: res.data.reference,
//           mission: res.data.mission,
//           description: res.data.description,
//           competenceObligatoire: res.data.competenceObligatoire,
//           competenceSouhaite: res.data.competenceSouhaite,
//           certificat: res.data.certificat,
//           autre: res.data.autre
//         });
//       } catch (err) {
//         console.error('Erreur lors de la récupération de l\'offre', err);
//         setFetchError('Offre non trouvée');
//       }
//     };

//     fetchOffre();
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/api/recrutements/${id}`, formData);
//       alert('Offre modifiée avec succès');
//       navigate('/offres');
//     } catch (err) {
//       console.error('Erreur lors de la modification de l\'offre', err);
//     }
//   };

//   if (fetchError) {
//     return <Alert variant="danger">{fetchError}</Alert>;
//   }

//   return (
//     <Container className="my-5">
//       <Row className="justify-content-md-center">
//         <Col md={8}>
//           <h2 className="text-center mb-4">Modifier l'Offre d'Emploi</h2>
//           <Form onSubmit={handleSubmit}>
//             <Row>
//               <Col md={6}>
//                 <Form.Group controlId="entreprise" className="mb-3">
//                   <Form.Label>Entreprise</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="entreprise"
//                     value={formData.entreprise}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="poste" className="mb-3">
//                   <Form.Label>Poste</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="poste"
//                     value={formData.poste}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group controlId="reference" className="mb-3">
//                   <Form.Label>Référence</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="reference"
//                     value={formData.reference}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="mission" className="mb-3">
//                   <Form.Label>Mission</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="mission"
//                     value={formData.mission}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={12}>
//                 <Form.Group controlId="description" className="mb-3">
//                   <Form.Label>Description</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group controlId="competenceObligatoire" className="mb-3">
//                   <Form.Label>Compétence obligatoire</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="competenceObligatoire"
//                     value={formData.competenceObligatoire}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="competenceSouhaite" className="mb-3">
//                   <Form.Label>Compétence souhaitée</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="competenceSouhaite"
//                     value={formData.competenceSouhaite}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group controlId="certificat" className="mb-3">
//                   <Form.Label>Certificat</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={2}
//                     name="certificat"
//                     value={formData.certificat}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="autre" className="mb-3">
//                   <Form.Label>Autre</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={2}
//                     name="autre"
//                     value={formData.autre}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Button variant="primary" type="submit" className="w-100">
//               Enregistrer les modifications
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default EditOffre;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditOffre = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    entreprise: '',
    poste: '',
    reference: '',
    mission: '',
    description: '',
    competenceObligatoire: '',
    competenceSouhaite: '',
    certificat: '',
    autre: ''
  });
  const [fetchError, setFetchError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffre = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recrutements/${id}`);
        setFormData({
          entreprise: res.data.entreprise,
          poste: res.data.poste,
          reference: res.data.reference,
          mission: res.data.mission,
          description: res.data.description,
          competenceObligatoire: res.data.competenceObligatoire,
          competenceSouhaite: res.data.competenceSouhaite,
          certificat: res.data.certificat,
          autre: res.data.autre
        });
      } catch (err) {
        console.error('Erreur lors de la récupération de l\'offre', err);
        setFetchError('Offre non trouvée');
      }
    };

    fetchOffre();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/recrutements/${id}`, formData);
      alert('Offre modifiée avec succès');
      navigate('/offres');
    } catch (err) {
      console.error('Erreur lors de la modification de l\'offre', err);
    }
  };

  const handleCancel = () => {
    navigate('/offres'); // Redirige vers la liste des offres
  };

  if (fetchError) {
    return <Alert variant="danger">{fetchError}</Alert>;
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Modifier l'Offre d'Emploi</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="entreprise" className="mb-3">
                  <Form.Label>Entreprise</Form.Label>
                  <Form.Control
                    type="text"
                    name="entreprise"
                    value={formData.entreprise}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="poste" className="mb-3">
                  <Form.Label>Poste</Form.Label>
                  <Form.Control
                    type="text"
                    name="poste"
                    value={formData.poste}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="reference" className="mb-3">
                  <Form.Label>Référence</Form.Label>
                  <Form.Control
                    type="text"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="mission" className="mb-3">
                  <Form.Label>Mission</Form.Label>
                  <Form.Control
                    type="text"
                    name="mission"
                    value={formData.mission}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group controlId="description" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="competenceObligatoire" className="mb-3">
                  <Form.Label>Compétence obligatoire</Form.Label>
                  <Form.Control
                    type="text"
                    name="competenceObligatoire"
                    value={formData.competenceObligatoire}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="competenceSouhaite" className="mb-3">
                  <Form.Label>Compétence souhaitée</Form.Label>
                  <Form.Control
                    type="text"
                    name="competenceSouhaite"
                    value={formData.competenceSouhaite}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="certificat" className="mb-3">
                  <Form.Label>Certificat</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="certificat"
                    value={formData.certificat}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="autre" className="mb-3">
                  <Form.Label>Autre</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="autre"
                    value={formData.autre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col>
                <Button variant="secondary" onClick={handleCancel} className="w-100 mb-2">
                  Annuler
                </Button>
                <Button variant="primary" type="submit" className="w-100">
                  Enregistrer les modifications
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditOffre;

// import React, { useState, useEffect } from "react";
// import { Form, Button, Alert } from "react-bootstrap";
// import axios from "axios";
// import {useNavigate} from 'react-router-dom'


// const EditCandidat = ({ candidate, onClose, onUpdate }) => {
//   const [formData, setFormData] = useState({ ...candidate });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (candidate._id) {
//       const fetchCandidateData = async () => {
//         try {
//           const res = await axios.get(`http://localhost:5000/get-file/${candidate._id}`);
//           setFormData(res.data.data);
//         } catch (error) {
//           setError("Échec de la récupération des données du candidat");
//           console.error("Échec de la récupération des données du candidat", error);
//         }
//       };

//       fetchCandidateData();
//     }
//   }, [candidate._id]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(`http://localhost:5000/update-file/${candidate._id}`, formData);
//       onUpdate(res.data.data); // Assurez-vous que `onUpdate` accepte et gère les données mises à jour
//       navigate('/listeCandidat'); // Redirection vers la liste des candidats
//       onClose(); // Fermer le modal après la mise à jour
//     } catch (error) {
//       console.error('Erreur lors de la modification de l\'offre');
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       {error && <Alert variant="danger">{error}</Alert>}
//       <Form.Group controlId="formName">
//         <Form.Label>Nom</Form.Label>
//         <Form.Control
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId="formPrenom">
//         <Form.Label>Prénom</Form.Label>
//         <Form.Control
//           type="text"
//           name="prenom"
//           value={formData.prenom}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId="formEmail">
//         <Form.Label>Email</Form.Label>
//         <Form.Control
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId="formBirthdate">
//         <Form.Label>Date de naissance</Form.Label>
//         <Form.Control
//           type="date"
//           name="birthdate"
//           value={formData.birthdate}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formPhone">
//         <Form.Label>Téléphone</Form.Label>
//         <Form.Control
//           type="text"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formCurrentPosition">
//         <Form.Label>Poste actuel</Form.Label>
//         <Form.Control
//           type="text"
//           name="currentPosition"
//           value={formData.currentPosition}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formPosition">
//         <Form.Label>Poste souhaité</Form.Label>
//         <Form.Control
//           type="text"
//           name="position"
//           value={formData.position}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formEmploymentType">
//         <Form.Label>Type d'emploi</Form.Label>
//         <Form.Control
//           type="text"
//           name="employmentType"
//           value={formData.employmentType}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formExperience">
//         <Form.Label>Expérience</Form.Label>
//         <Form.Control
//           type="text"
//           name="experience"
//           value={formData.experience}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formJobDescription">
//         <Form.Label>Description du poste</Form.Label>
//         <Form.Control
//           type="text"
//           name="jobDescription"
//           value={formData.jobDescription}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formJobTitle">
//         <Form.Label>Titre du poste</Form.Label>
//         <Form.Control
//           type="text"
//           name="jobTitle"
//           value={formData.jobTitle}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formCompany">
//         <Form.Label>Entreprise actuelle</Form.Label>
//         <Form.Control
//           type="text"
//           name="company"
//           value={formData.company}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formLocation">
//         <Form.Label>Lieu</Form.Label>
//         <Form.Control
//           type="text"
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formStartDate">
//         <Form.Label>Date de début</Form.Label>
//         <Form.Control
//           type="date"
//           name="startDate"
//           value={formData.startDate}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formEndDate">
//         <Form.Label>Date de fin</Form.Label>
//         <Form.Control
//           type="date"
//           name="endDate"
//           value={formData.endDate}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formAchievements">
//         <Form.Label>Réalisations</Form.Label>
//         <Form.Control
//           type="text"
//           name="achievements"
//           value={formData.achievements}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formSkillsUsed">
//         <Form.Label>Compétences utilisées</Form.Label>
//         <Form.Control
//           type="text"
//           name="skillsUsed"
//           value={formData.skillsUsed}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formSkillsTitle">
//         <Form.Label>Titre des compétences</Form.Label>
//         <Form.Control
//           type="text"
//           name="skillsTitle"
//           value={formData.skillsTitle}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formOutils">
//         <Form.Label>Outils techniques</Form.Label>
//         <Form.Control
//           type="text"
//           name="outil"
//           value={formData.outil}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formSkillsDescription">
//         <Form.Label>Description des compétences</Form.Label>
//         <Form.Control
//           type="text"
//           name="skillsDescription"
//           value={formData.skillsDescription}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formSkillsYears">
//         <Form.Label>Années d'expérience des compétences</Form.Label>
//         <Form.Control
//           type="text"
//           name="skillsYears"
//           value={formData.skillsYears}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formCertificat">
//         <Form.Label>Certificats obtenus</Form.Label>
//         <Form.Control
//           type="text"
//           name="certificat"
//           value={formData.certificat}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formSkillsTitleTransversal">
//         <Form.Label>Titre des compétences transversales</Form.Label>
//         <Form.Control
//           type="text"
//           name="skillsTitleTransversal"
//           value={formData.skillsTitleTransversal}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formSkillsDescriptionTransversal">
//         <Form.Label>Description des compétences transversales</Form.Label>
//         <Form.Control
//           type="text"
//           name="skillsDescriptionTransversal"
//           value={formData.skillsDescriptionTransversal}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formSkillsYearsTransversal">
//         <Form.Label>Années d'expérience des compétences transversales</Form.Label>
//         <Form.Control
//           type="text"
//           name="skillsYearsTransversal"
//           value={formData.skillsYearsTransversal}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="formPdf">
//         <Form.Label>CV</Form.Label>
//         <Form.Control
//           type="text"
//           name="pdf"
//           value={formData.pdf}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Enregistrer
//       </Button>
//     </Form>
//   );
// };

// export default EditCandidat;




import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditCandidat = ({ candidate, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...candidate });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (candidate._id) {
      const fetchCandidateData = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/get-file/${candidate._id}`);
          setFormData(res.data.data);
        } catch (error) {
          setError("Échec de la récupération des données du candidat");
          console.error("Échec de la récupération des données du candidat", error);
        }
      };

      fetchCandidateData();
    }
  }, [candidate._id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/update-file/${candidate._id}`, formData);
      if (res.status === 200) {
        onUpdate(res.data.data); // Assurez-vous que `onUpdate` accepte et gère les données mises à jour
        navigate('/listeCandidat'); // Redirection vers la liste des candidats
        onClose(); // Fermer le modal après la mise à jour
      } else {
        setError("Erreur lors de la modification du candidat");
      }
    } catch (error) {
      setError("Erreur lors de la modification du candidat");
      console.error('Erreur lors de la modification du candidat', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formName">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPrenom">
        <Form.Label>Prénom</Form.Label>
        <Form.Control
          type="text"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBirthdate">
        <Form.Label>Date de naissance</Form.Label>
        <Form.Control
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formPhone">
        <Form.Label>Téléphone</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formCurrentPosition">
        <Form.Label>Poste actuel</Form.Label>
        <Form.Control
          type="text"
          name="currentPosition"
          value={formData.currentPosition}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formPosition">
        <Form.Label>Poste souhaité</Form.Label>
        <Form.Control
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formEmploymentType">
        <Form.Label>Type d'emploi</Form.Label>
        <Form.Control
          type="text"
          name="employmentType"
          value={formData.employmentType}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formExperience">
        <Form.Label>Expérience</Form.Label>
        <Form.Control
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formJobDescription">
        <Form.Label>Description du poste</Form.Label>
        <Form.Control
          type="text"
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formJobTitle">
        <Form.Label>Titre du poste</Form.Label>
        <Form.Control
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formCompany">
        <Form.Label>Entreprise actuelle</Form.Label>
        <Form.Control
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formLocation">
        <Form.Label>Lieu</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formStartDate">
        <Form.Label>Date de début</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formEndDate">
        <Form.Label>Date de fin</Form.Label>
        <Form.Control
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formAchievements">
        <Form.Label>Réalisations</Form.Label>
        <Form.Control
          type="text"
          name="achievements"
          value={formData.achievements}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formSkillsUsed">
        <Form.Label>Compétences utilisées</Form.Label>
        <Form.Control
          type="text"
          name="skillsUsed"
          value={formData.skillsUsed}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formSkillsTitle">
        <Form.Label>Titre des compétences</Form.Label>
        <Form.Control
          type="text"
          name="skillsTitle"
          value={formData.skillsTitle}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formOutils">
        <Form.Label>Outils techniques</Form.Label>
        <Form.Control
          type="text"
          name="outil"
          value={formData.outil}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formSkillsDescription">
        <Form.Label>Description des compétences</Form.Label>
        <Form.Control
          type="text"
          name="skillsDescription"
          value={formData.skillsDescription}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formSkillsYears">
        <Form.Label>Années d'expérience des compétences</Form.Label>
        <Form.Control
          type="text"
          name="skillsYears"
          value={formData.skillsYears}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formCertificat">
        <Form.Label>Certificats obtenus</Form.Label>
        <Form.Control
          type="text"
          name="certificat"
          value={formData.certificat}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formSkillsTitleTransversal">
        <Form.Label>Titre des compétences transversales</Form.Label>
        <Form.Control
          type="text"
          name="skillsTitleTransversal"
          value={formData.skillsTitleTransversal}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formSkillsDescriptionTransversal">
        <Form.Label>Description des compétences transversales</Form.Label>
        <Form.Control
          type="text"
          name="skillsDescriptionTransversal"
          value={formData.skillsDescriptionTransversal}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formSkillsYearsTransversal">
        <Form.Label>Années d'expérience des compétences transversales</Form.Label>
        <Form.Control
          type="text"
          name="skillsYearsTransversal"
          value={formData.skillsYearsTransversal}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formPdf">
        <Form.Label>CV</Form.Label>
        <Form.Control
          type="text"
          name="pdf"
          value={formData.pdf}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Enregistrer
      </Button>
    </Form>
  );
};

export default EditCandidat;

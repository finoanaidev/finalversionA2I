import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCandidat = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const fetchCandidature = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/candidatures/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching candidature:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/candidatures/${id}`, formData);
      // Rediriger vers la page de liste des candidatures après modification
      navigate('/listeCandidat');
    } catch (error) {
      console.error('Error updating candidature:', error);
    }
  };

  useEffect(() => {
    fetchCandidature();
  }, [id]);

  return (
    <div>
    <h1>Modifier la candidature</h1>
    <form onSubmit={handleSubmit}>
      {/* Champs de modification de la candidature */}
      <input
        type="text"
        placeholder="Nom"
        value={formData.name || ''}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Prenoms"
        value={formData.prenom || ''}
        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email || ''}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Téléphone"
        value={formData.phone || ''}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Poste Actuel"
        value={formData.currentPosition || ''}
        onChange={(e) => setFormData({ ...formData, currentPosition: e.target.value })}
      />
      <input
        type="text"
        placeholder="Poste Souhaité"
        value={formData.position || ''}
        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
      />
      <input
        type="text"
        placeholder="Type de Contrat"
        value={formData.employmentType || ''}
        onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
      />
      <input
        type="text"
        placeholder="Expérience"
        value={formData.experience || ''}
        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description du Poste"
        value={formData.jobDescription || ''}
        onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
      />
      {/* <input
        type="text"
        placeholder="Autres Postes"
        value={formData.otherPositions || ''}
        onChange={(e) => setFormData({ ...formData, otherPositions: e.target.value })}
      /> */}
      <input
        type="text"
        placeholder="Titre du Poste"
        value={formData.jobTitle || ''}
        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
      />
      <input
        type="text"
        placeholder="Entreprise"
        value={formData.company || ''}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
      />
      <input
        type="text"
        placeholder="Localisation"
        value={formData.location || ''}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />
      <input
        type="date"
        placeholder="Date de Début"
        value={formData.startDate || ''}
        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
      />
      <input
        type="date"
        placeholder="Date de Fin"
        value={formData.endDate || ''}
        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
      />
      <input
        type="text"
        placeholder="Réalisations"
        value={formData.achievements || ''}
        onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
      />
      <input
        type="text"
        placeholder="Compétences Utilisées"
        value={formData.skillsUsed || ''}
        onChange={(e) => setFormData({ ...formData, skillsUsed: e.target.value })}
      />
      <input
        type="text"
        placeholder="Titre des Compétences"
        value={formData.skillsTitle || ''}
        onChange={(e) => setFormData({ ...formData, skillsTitle: e.target.value })}
      />
       <input
        type="text"
        placeholder="Outils techniques"
        value={formData.outil || ''}
        onChange={(e) => setFormData({ ...formData, outil: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description des Compétences"
        value={formData.skillsDescription || ''}
        onChange={(e) => setFormData({ ...formData, skillsDescription: e.target.value })}
      />
      <input
        type="number"
        placeholder="Années d'Expérience des Compétences"
        value={formData.skillsYears || ''}
        onChange={(e) => setFormData({ ...formData, skillsYears: e.target.value })}
      />

<input
        type="number"
        placeholder="Certificats obtenus"
        value={formData.certificat || ''}
        onChange={(e) => setFormData({ ...formData, certificat: e.target.value })}
      />

      <button type="submit">Enregistrer les modifications</button>
    </form>
  </div>
  
  );
};

export default EditCandidat;

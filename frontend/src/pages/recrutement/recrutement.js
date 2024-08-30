
import React, { useState } from 'react';
import './recrutement.css';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Recrutement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    entreprise: '',
    poste: '',
    reference: '',
    description: '',
    mission: '',
    resultat: '',
    competenceObligaoire: '',
    competenceSouhaite: '',
    certificat: '',
    autre: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/recrutements', formData);
      alert('Offre d\'emploi partagée avec succès');
      setFormData({
        entreprise: '',
        poste: '',
        reference: '',
        description: '',
        mission: '',
        resultat: '',
        competenceObligaoire: '',
        competenceSouhaite: '',
        certificat: '',
        autre: ''
      });
      alert ('Votre offre a partagé avec succée')
    } catch (err) {
      console.error('Erreur lors de l\'envoi de l\'offre', err);
    }
  };
  return (
    <div className='Recrutement'>
      <div className='recru-cont'>
        <p>
          <strong>Déposez votre offre d'emploi dès maintenant</strong> <br />
          Trouvez les meilleurs talents pour votre entreprise en envoyant votre offre sur Hoag A2I.
        </p>
      </div>

      <div className="recru-co">
        <div className='recru-left'>
          <form onSubmit={handleSubmit}>
            <label htmlFor="entreprise">Entreprise</label>
            <input
              type="text"
              id="entreprise"
              name="entreprise"
               placeholder='Nom de votre entreprise'
              value={formData.entreprise}
              onChange={handleChange}
              required
            />

            <label htmlFor="poste">Poste proposé</label>
            <textarea
              type="text"
              id="poste"
              name="poste"
              placeholder='Poste proposé'
              value={formData.poste}
              onChange={handleChange}
              required
              ></textarea>

            <label htmlFor="reference">Référence</label>
            <input
              type="text"
              id="reference"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              required
            />

            <label htmlFor="description">Description du poste</label>
            <textarea
              id="description"
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>

            <label htmlFor="mission">Missions attendues sur ce poste</label>
            <input
              type="text"
              id="mission"
              name="mission"
              value={formData.mission}
              onChange={handleChange}
              required
            />

            <label htmlFor="resultat">Résultats attendus (Objectifs mesurables)</label>
            <input
              type="text"
              id="resultat"
              name="resultat"
              value={formData.resultat}
              onChange={handleChange}
              required
            />

            <label htmlFor="competenceObligatoire">Compétences obligatoires</label>
            <input
              type="text"
              id="competenceObligatoire"
              name="competenceObligatoire"
              value={formData.competenceObligatoire}
              onChange={handleChange}
              required
            />

            <label htmlFor="competenceSouhaite">Compétences souhaitées</label>
            <input
              type="text"
              id="competenceSouhaite"
              name="competenceSouhaite"
              value={formData.competenceSouhaite}
              onChange={handleChange}
              required
            />

            <label htmlFor="certificat">Certificat exigé</label>
            <input
              type="text"
              id="certificat"
              name="certificat"
              value={formData.certificat}
              onChange={handleChange}
              required
            />

            <label htmlFor="autre">Autres</label>
            <textarea
              id="autre"
              name="autre"
              rows="2"
              value={formData.autre}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Partager</button>
          </form>
        </div>

        <div className='recru-right'>
          <br/><br/><br/><br/><br/><br/>
          <p>À PROPOS DU COMPTE ENTREPRISE</p>
          <p>
            <strong>
              "Cautionne et propose les meilleurs candidats pour un poste de travail spécifique,
              sélectionnés avec soin pour répondre aux besoins de votre entreprise."
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recrutement;

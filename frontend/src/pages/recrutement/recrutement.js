import React, { useState } from "react";
import "./recrutement.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Recrutement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    entreprise: "",
    poste: "",
    reference: "",
    description: "",
    mission: "",
    resultat: "",
    competenceObligaoire: "",
    competenceSouhaite: "",
    certificat: "",
    autre: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/recrutements", formData);
      setFormData({
        entreprise: "",
        poste: "",
        reference: "",
        description: "",
        mission: "",
        resultat: "",
        competenceObligaoire: "",
        competenceSouhaite: "",
        certificat: "",
        autre: "",
      });
      alert(
        "Nous avons bien reçu votre offre. Nous vous contacterons directement s'il y a un candidat mieux adapté à ce poste."
      );
    } catch (err) {
      console.error("Erreur lors de l'envoi de l'offre", err);
    }
  };
  return (
    <div className="Recrutement">
      <div className="recru-cont">
        <p>
          <strong>Déposez votre offre d'emploi dès maintenant</strong> <br />
          Trouvez les meilleurs talents pour votre entreprise en envoyant votre
          offre sur Hoag A2I.
        </p>
      </div>

      <div className="recru-co">
        <div className="recru-left">
          <form onSubmit={handleSubmit}>
            <label htmlFor="entreprise">
              Entreprise<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="entreprise"
              name="entreprise"
              placeholder="Nom de votre entreprise"
              value={formData.entreprise}
              onChange={handleChange}
              required
            />

            <label htmlFor="poste">
              Poste proposé<span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              type="text"
              id="poste"
              name="poste"
              placeholder="Poste proposé"
              value={formData.poste}
              onChange={handleChange}
              required
            ></textarea>

            <label htmlFor="reference">
              Référence<span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              type="text"
              id="reference"
              name="reference"
              placeholder="Référence de ce poste"
              value={formData.reference}
              onChange={handleChange}
              required
            />

            <label htmlFor="description">
              Description du poste<span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
            <div>
              <label htmlFor="mission">
                Missions attendues sur ce poste
                <span style={{ color: "red" }}>*</span>
              </label>
              <ol>
                {" "}
                {/* Utilisation d'une liste ordonnée */}
                {formData.mission.split("\n").map((mission, index) => (
                  <li key={index}>{mission}</li>
                ))}
              </ol>
              <textarea
                type="text"
                id="mission"
                name="mission"
                placeholder="Missions attendues (séparez chaque mission par une nouvelle ligne)"
                value={formData.mission}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="resultat">
                Résultats attendus (Objectifs mesurables)
                <span style={{ color: "red" }}>*</span>
              </label>
              <ol>
                {" "}
                {/* Utilisation d'une liste ordonnée pour les résultats */}
                {formData.resultat.split("\n").map((resultat, index) => (
                  <li key={index}>{resultat}</li>
                ))}
              </ol>
              <textarea
                id="resultat"
                name="resultat"
                placeholder="Citez les résultats attendus(Séparez chaque objectif par une nouvelle ligne)"
                value={formData.resultat}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="competenceObligatoire">
                Compétences obligatoires<span style={{ color: "red" }}>*</span>
              </label>
              <ol>
                {(formData.competenceObligatoire || "")
                  .split("\n")
                  .map((competence, index) => (
                    <li key={index}>{competence}</li>
                  ))}
              </ol>
              <textarea
                id="competenceObligatoire"
                name="competenceObligatoire"
                placeholder="Cittez les compétences obligatoires (Séparez chaque compétence par une nouvelle ligne)"
                value={formData.competenceObligatoire}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="competenceSouhaite">Compétences souhaitées</label>
              <ol>
                {(formData.competenceSouhaite || "")
                  .split("\n")
                  .map((competence, index) => (
                    <li key={index}>{competence}</li>
                  ))}
              </ol>
              <textarea
                id="competenceSouhaite"
                name="competenceSouhaite"
                placeholder="Citez les compétence souhaités) Séparez chaque compétence par une nouvelle ligne"
                value={formData.competenceSouhaite}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="certificat">Certificat exigé</label>
              <ol>
                {(formData.certificat || "")
                  .split("\n")
                  .map((certificat, index) => (
                    <li key={index}>{certificat}</li>
                  ))}
              </ol>
              <textarea
                id="certificat"
                name="certificat"
                placeholder="Certificat exigé (Séparez chaque certificat par une nouvelle ligne)"
                value={formData.certificat}
                onChange={handleChange}
                required
              />
            </div>

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

        <div className="recru-right">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <p>À PROPOS DU COMPTE ENTREPRISE</p>
          <p>
            <strong>
              "Cautionne et propose les meilleurs candidats pour un poste de
              travail spécifique, sélectionnés avec soin pour répondre aux
              besoins de votre entreprise."
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recrutement;

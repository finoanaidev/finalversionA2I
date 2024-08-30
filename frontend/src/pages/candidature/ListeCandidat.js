import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./liste.css";

const ListeCandidat = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [allImage, setAllImage] = useState([]);
  const navigate = useNavigate();

  const fetchCandidatures = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/candidatures");
      setCandidatures(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des candidatures :", error);
    }
  };

  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:5000/get-files");
      setAllImage(result.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des fichiers PDF :", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editCandidat/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/candidatures/${id}`);
      fetchCandidatures();
    } catch (error) {
      console.error("Erreur lors de la suppression de la candidature :", error);
    }
  };

  useEffect(() => {
    fetchCandidatures();
    getPdf();
  }, []);

  const handleAddCandidature = () => {
    navigate("/candidature");
  };

  const showPdf = (pdf) => {
    const pdfUrl = `http://localhost:5000/files/${pdf}`;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="list-container">
      <h2>Liste des candidatures</h2>
      <button onClick={handleAddCandidature}>Ajouter</button>
      <ul>
        {candidatures.map((candidature) => (
          <li key={candidature._id} className="list-item">
            <h3>
               {candidature.email}
            </h3>
            <div className="details">
            <p>
                <span>Nom :</span> {candidature.name}
              </p>
              <p>
                <span>Prenom :</span> {candidature.prenom}
              </p>
              <p>
                <span>Date de naissance :</span> {candidature.birthdate}
              </p>
              <p>
                <span>Téléphone :</span> {candidature.phone}
              </p>
              <p>
                <span>Poste actuel :</span> {candidature.currentPosition}
              </p>
              <p>
                <span>Poste souhaité :</span> {candidature.position}
              </p>
              <p>
                <span>Type d'emploi :</span> {candidature.employmentType}
              </p>
              <p>
                <span>Expérience :</span> {candidature.experience}
              </p>
              <p>
                <span>Description du poste :</span> {candidature.jobDescription}
              </p>
              {/* <p>
                <span>Autres postes :</span> {candidature.otherPositions}
              </p> */}
              <p>
                <span>Titre du poste :</span> {candidature.jobTitle}
              </p>
              <p>
                <span>Entreprise actuelle :</span> {candidature.company}
              </p>
              <p>
                <span>Lieu :</span> {candidature.location}
              </p>
              <p>
                <span>Date de début :</span> {candidature.startDate}
              </p>
              <p>
                <span>Date de fin :</span> {candidature.endDate}
              </p>
              <p>
                <span>Réalisations :</span> {candidature.achievements}
              </p>
              <p>
                <span>Compétences utilisées :</span> {candidature.skillsUsed}
              </p>
              <p>
                <span>Titre des compétences :</span> {candidature.skillsTitle}
              </p>
              <p>
                <span>Outils techniques :</span> {candidature.outil}
              </p>
              <p>
                <span>Description des compétences :</span> {candidature.skillsDescription}
              </p>
              <p>
                <span>Années d'expérience des compétences :</span> {candidature.skillsYears}
              </p>

              <p>
                <span>Certificats obtenus :</span> {candidature.certificat}
              </p>

              <p>
                <span>Titre des compétences :</span> {candidature.skillsTitleTransversal}
              </p>
              <p>
                <span>Description des compétences :</span> {candidature.skillsDescriptionTransversal}
              </p>
              <p>
                <span>Années d'expérience des compétences :</span> {candidature.skillsYearsTransversal}
              </p>

            </div>
            <div className="actions">
              <button onClick={() => handleEdit(candidature._id)}>Modifier</button>
              <button onClick={() => handleDelete(candidature._id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="uploaded">
        <h4>Fichiers PDF téléchargés :</h4>
        <div className="output-div">
          {allImage.length === 0
            ? "Aucun fichier PDF téléchargé"
            : allImage.map((data, index) => (
                <div className="inner-div" key={index}>
                  <h6>Titre : {data.title}</h6>
                  <button className="btn btn-primary" onClick={() => showPdf(data.pdf)}>
                    Afficher le PDF
                  </button>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ListeCandidat;

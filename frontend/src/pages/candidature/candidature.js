import React, { useState } from "react";
import axios from "axios";
import "./candidature.css";
import { IoIosLogIn } from "react-icons/io";

const FileUpload = () => {
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [showThirdForm, setShowThirdForm] = useState(false);

  const [employmentTypeOptions, setEmploymentTypeOptions] = useState([]);
  const [contractTypeOptions, setContractTypeOptions] = useState([]);
  const [disponibiliteTypeOptions, setDisponibiliteTypeOptions] = useState([]);
  const [engagementTypeOptions, setEngagementTypeOptions] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    prenom: "",
    birthdate: "",
    email: "",
    phone: "",
    currentPosition: "",
    position: "",
    employmentType: "",
    contractType: "",
    disponibilite: "",
    engagement: "",
    experience: "",
    jobDescription: "",
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    achievements: "",
    skillsUsed: "",
    skillsTitle: "",
    outil: "",
    skillsDescription: "",
    skillsYears: 0,
    certificat: "",
    skillsTitleTransversal: "",
    skillsDescriptionTransversal: "",
    skillsYearsTransversal: 0,
    file: null,
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateFirstForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Nom est requis";
    if (!formData.prenom) errors.prenom = "Prénoms est requis";
    if (!formData.birthdate) errors.birthdate = "Date de naissance est requise";
    if (!formData.email) errors.email = "Email est requis";
    if (!formData.phone) errors.phone = "Téléphone est requis";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const validateSecondForm = () => {
    const errors = {};
    if (!formData.currentPosition)
      errors.currentPosition = "Poste actuel est requis";
    if (!formData.experience) errors.experience = "Réalisation est requise";
    if (!formData.position) errors.position = "Poste envisagé est requis";
    if (!formData.jobTitle) errors.jobTitle = "Poste est requise";
    if (!formData.jobDescription)
      errors.jobDescription = "Description du poste est requise";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleNext = () => {
    if (validateFirstForm()) {
      alert(
        "Nous avons bien enregistré toutes vos informations. Bienvenue chez HOAG A2I et bonne navigation !"
      );
      setShowSecondForm(true);
    }
  };

  const handleNextToThirdForm = () => {
    if (validateSecondForm()) {
      alert("Nous permettez de vous aider à trouver votre travail de rêve.");
      setShowThirdForm(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    for (const key in formData) {
      uploadData.append(key, formData[key]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/upload-files",
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Votre candidature est bien retenue. Nous vous appellerons le plus vite possible pour la suite.");
    } catch (error) {
      setMessage("Veuillez remplir tous les champs");
    }
  };

  const handleJobTitleChange = (event) => {
    const selectedJobTitle = event.target.value;
    setFormData({ ...formData, jobTitle: selectedJobTitle });

    if (selectedJobTitle === "Stage") {
      setEmploymentTypeOptions(["etude", "alternance", "embauche"]);
      setContractTypeOptions(["interim", "CDD", "CDI"]);
      setDisponibiliteTypeOptions(["remote", "présentiel", "hybride"]);
      setEngagementTypeOptions(["parttime", "fulltime"]);
    } else if (selectedJobTitle === "Travail") {
      setEmploymentTypeOptions(["remote", "parttime", "fulltime"]);
      setContractTypeOptions(["CDI", "CDD", "Freelance"]);
      setDisponibiliteTypeOptions(["remote", "parttime", "fulltime"]);
      setEngagementTypeOptions(["parttime", "fulltime"]);
    } else {
      setEmploymentTypeOptions([]);
      setContractTypeOptions([]);
      setDisponibiliteTypeOptions([]);
      setEngagementTypeOptions([]);
    }
  };

  return (
    <div className="candidature">
      <div className="cand-cont">
        <p>
          <strong>Boostez votre carrière avec Hoag A2I</strong> <br /> Que vous
          soyez en poste, freelance, en reconversion ou à la recherche de votre
          premier emploi, Hoag A2I vous ouvre de nouvelles portes.
        </p>
      </div>

      {!showSecondForm ? (
        <div className="form-container">
          <h5>
            Faites briller votre parcours professionnel en remplissant ce
            formulaire et déposant votre CV dès maintenant{" "}
          </h5>

          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Nom: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div>
              <label>
                Prénoms:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Votre prénom(s)"
              />
              {errors.prenom && <p className="error">{errors.prenom}</p>}
            </div>
            <div>
              <label>
                Date de naissance:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
              />
              {errors.birthdate && <p className="error">{errors.birthdate}</p>}
            </div>
            <div>
              <label>
                Email:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Adresse email"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
              <label>
                Téléphone:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="033 ** *** ** | 034 ** *** ** "
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            <button type="button" onClick={handleNext} className="next-button">
              Soumettre
            </button>
          </form>
        </div>
      ) : !showThirdForm ? (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Poste actuel:<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="currentPosition"
                value={formData.currentPosition}
                onChange={handleChange}
                placeholder="Votre poste actuel"
              />
              {errors.currentPosition && (
                <p className="error">{errors.currentPosition}</p>
              )}
            </div>
            <div>
              <label>
                Résumez vos réalisations en travail:
                <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="cotre réalisation sur ce travail"
              />
              {errors.experience && (
                <p className="error">{errors.experience}</p>
              )}
            </div>
            <div>
              <div>
                <label>
                  Poste envisagé:<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Poste envisagé"
                />
                {errors.position && <p className="error">{errors.position}</p>}
              </div>
              <div className="radio-group">
                <label>
                  Stage
                  <br />
                  <input
                    type="radio"
                    name="jobTitle"
                    value="Stage"
                    checked={formData.jobTitle === "Stage"}
                    onChange={handleJobTitleChange}
                  />
                  {errors.jobTitle && (
                    <p className="error">{errors.jobTitle}</p>
                  )}
                </label>
                <label>
                  Travail
                  <br />
                  <input
                    type="radio"
                    name="jobTitle"
                    value="Travail"
                    checked={formData.jobTitle === "Travail"}
                    onChange={handleJobTitleChange}
                  />
                  {errors.jobTitle && (
                    <p className="error">{errors.jobTitle}</p>
                  )}
                </label>
              </div>

              {formData.jobTitle && (
                <div className="choice-section">
                  <label>Type d'emploi:</label>
                  <select
                    id="employment-type"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner...</option>
                    {employmentTypeOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <label>Type de contrat:</label>
                  <select
                    type="text"
                    name="contractType"
                    value={formData.contractType}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner...</option>
                    {contractTypeOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <label>Disponibilité:</label>
                  <select
                    type="text"
                    name="disponibilite"
                    value={formData.disponibilite}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner...</option>
                    {disponibiliteTypeOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <label>Engagement:</label>
                  <select
                    type="text"
                    name="engagement"
                    value={formData.engagement}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner...</option>
                    {engagementTypeOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            {/* <div>
              <label>Decrivez vos attentes pour ce poste:<span style={{ color: 'red' }}>*</span></label>
              <textarea
                type="text"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
              />
              {errors.jobDescription && (
                <p className="error">{errors.jobDescription}</p>
              )}
            </div> */}
            <div>
              <label>
                Décrivez vos attentes pour ce poste:{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <p>Veuillez lister vos attentes une par ligne (1, 2, 3...)</p>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                placeholder={`1. \n2. \n3. `}
                rows={5} // Ajuster la hauteur pour plus de lignes
              />
              {errors.jobDescription && (
                <p className="error">{errors.jobDescription}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleNextToThirdForm}
              className="next-button"
            >
              Soumettre
            </button>
          </form>
        </div>
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Expériences en travail</h2>
            <div className="form-group">
              <label>Poste:<span style={{ color: "red" }}>*</span></label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="votre poste"
              />
              {errors.jobTitle && <p className="error">{errors.jobTitle}</p>}
            </div>
            <div className="form-group">
              <label>Entreprise:<span style={{ color: "red" }}>*</span></label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nom de votre entreprise"
              />
              {errors.company && <p className="error">{errors.company}</p>}
            </div>
            <div className="form-group">
              <label>Adresse physique:<span style={{ color: "red" }}>*</span></label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Lot IVD 89A Behoririka Antananarivo"
              />
              {errors.location && <p className="error">{errors.location}</p>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="start-date">Date de début<span style={{ color: "red" }}>*</span></label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
                {errors.startDate && (
                  <p className="error">{errors.startDate}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="end-date">Date de fin <span style={{ color: "red" }}>*</span></label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
                {errors.endDate && <p className="error">{errors.endDate}</p>}
              </div>
            </div>
            {/* <div className="form-group">
              <label htmlFor="achievements">Vos réalisations</label>
              <textarea
                type="text"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
              />
              {errors.achievements && (
                <p className="error">{errors.achievements}</p>
              )}
            </div> */}
            <div className="form-group">
              <label htmlFor="achievements">
                Vos réalisations <span style={{ color: "red" }}>*</span>
              </label>
              <p>Veuillez lister vos réalisations une par ligne (1, 2, 3...)</p>
              <textarea
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                placeholder={`1. \n2. \n3. `}
                rows={5} // Ajuster la hauteur pour plus de lignes
              />
              {errors.achievements && (
                <p className="error">{errors.achievements}</p>
              )}
            </div>

            {/* <div className="form-group">
              <label htmlFor="skills-used">
                Enumerez les compétences techniques utilisés
              </label>
              <textarea
                type="text"
                name="skillsUsed"
                value={formData.skillsUsed}
                onChange={handleChange}
              />
              {errors.skillsUsed && (
                <p className="error">{errors.skillsUsed}</p>
              )}
            </div> */}
            <div className="form-group">
              <label htmlFor="skills-used">
                Énumérez les compétences techniques utilisées{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                name="skillsUsed"
                value={formData.skillsUsed}
                onChange={handleChange}
                placeholder={`1. \n2. \n3. `}
                rows={5} // Ajuster la hauteur pour plus de lignes
              />
              {errors.skillsUsed && (
                <p className="error">{errors.skillsUsed}</p>
              )}
            </div>

            <div>
              <h5>Compétence technique</h5>
              <div className="form-group">
                <label htmlFor="skills-title">Nom de la compétence: <span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  name="skillsTitle"
                  value={formData.skillsTitle}
                  onChange={handleChange}
                  placeholder="Votre compétence technique"
                />
                {errors.skillsTitle && (
                  <p className="error">{errors.skillsTitle}</p>
                )}
              </div>
              {/* <div className="form-group">
                <label htmlFor="skills-title">Outils techniques</label>
                <textarea
                  type="text"
                  name="outil"
                  value={formData.outil}
                  onChange={handleChange}
                  placeholder="Outils techniques"
                />
                {errors.outil && <p className="error">{errors.outil}</p>}
              </div> */}
              <div className="form-group">
                <label htmlFor="skills-title">
                  Outils techniques <span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  name="outil"
                  value={formData.outil}
                  onChange={handleChange}
                  placeholder={`1. \n2. \n3.`} // Exemple de numérotation dans le placeholder
                  rows={5} // Ajuster la hauteur pour permettre plusieurs lignes
                />
                {errors.outil && <p className="error">{errors.outil}</p>}
              </div>

              <div>
                <label>Description:<span style={{ color: "red" }}>*</span></label>
                <textarea
                  type="text"
                  name="skillsDescription"
                  value={formData.skillsDescription}
                  onChange={handleChange}
                />
                {errors.skillsDescription && (
                  <p className="error">{errors.skillsDescription}</p>
                )}
              </div>
            </div>

            <div>
              <label>Nombre d'années d'expérience:<span style={{ color: "red" }}>*</span></label>
              <input
                type="number"
                name="skillsYears"
                value={formData.skillsYears}
                onChange={handleChange}
              />
              {errors.skillsYears && (
                <p className="error">{errors.skillsYears}</p>
              )}
            </div>
            {/* <div>
              <label>Certificat obtenus:</label>
              <textarea
                type="text"
                name="certificat"
                value={formData.certificat}
                onChange={handleChange}
              />
              {errors.certificat && (
                <p className="error">{errors.certificat}</p>
              )}
            </div> */}
            <div>
              <label>
                Certificat obtenus: <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                name="certificat"
                value={formData.certificat}
                onChange={handleChange}
                placeholder={`1. \n2. \n3.`} // Placeholder avec numérotation pour indiquer l'attente
                rows={5} // Ajuster la hauteur pour plusieurs lignes
              />
              {errors.certificat && (
                <p className="error">{errors.certificat}</p>
              )}
            </div>

            <h5>Compétence Transversale</h5>
            <div className="form-group">
              <label htmlFor="skills-title">Nom de la compétence<span style={{ color: "red" }}>*</span></label>
              <input
                type="text"
                name="skillsTitleTransversal"
                value={formData.skillsTitleTransversal}
                onChange={handleChange}
placeholder="Nom de votre compétence transversale"
              />
              {errors.skillsTitleTransversal && (
                <p className="error">{errors.skillsTitleTransversal}</p>
              )}
            </div>
            <div>
              <label>Description:<span style={{ color: "red" }}>*</span></label>
              <textarea
                type="text"
                name="skillsDescriptionTransversal"
                value={formData.skillsDescriptionTransversal}
                onChange={handleChange}
                placeholder="Description de la compétence"
              />
              {errors.skillsDescriptionTransversal && (
                <p className="error">{errors.skillsDescriptionTransversal}</p>
              )}
            </div>
            <div>
              <label>Nombre d'années d'expérience:<span style={{ color: "red" }}>*</span></label>
              <input
                type="number"
                name="skillsYearsTransversal"
                value={formData.skillsYearsTransversal}
                onChange={handleChange}
              />
              {errors.skillsYearsTransversal && (
                <p className="error">{errors.skillsYearsTransversal}</p>
              )}
            </div>

            <div>
              <label>CV:</label>
              <input type="file" name="file" onChange={handleFileChange} />
            </div>

            <button type="submit" className="submit-button">
              Envoyer
            </button>
            {message && <p>{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

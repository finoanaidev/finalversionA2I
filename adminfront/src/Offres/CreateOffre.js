// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CreateOffre = () => {
//   const [titre, setTitre] = useState('');
//   const [description, setDescription] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post('http://localhost:5000/api/sectionOffres', {
//         titre,
//         description
//       });
//       setMessage('Offre créée avec succès!');
//       // Redirection vers la page des offres après la création
//       navigate('/section-offre');
//     } catch (error) {
//       setMessage('Erreur lors de la création de l\'offre');
//       console.error('Error creating offer:', error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Créer une Offre</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group mb-3">
//           <label htmlFor="titre">Titre:</label>
//           <input
//             type="text"
//             id="titre"
//             className="form-control"
//             value={titre}
//             onChange={(e) => setTitre(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group mb-3">
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             className="form-control"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           ></textarea>
//         </div>
//         <button type="submit" className="btn btn-primary">Créer Offre</button>
//       </form>
//       {message && <div className="alert alert-info mt-3">{message}</div>}
//     </div>
//   );
// };

// export default CreateOffre;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateOffre = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [mission, setMission] = useState('');
  const [competence, setCompetence] = useState('');
  const [atouts, setAtouts] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/sectionOffres', {
        titre,
        description,
        mission,
        competence,
        atouts
      });
      setMessage('Offre créée avec succès!');
      // Redirection vers la page des offres après la création
      navigate('/section-offre');
    } catch (error) {
      setMessage('Erreur lors de la création de l\'offre');
      console.error('Error creating offer:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Créer une Offre</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="titre">Titre:</label>
          <input
            type="text"
            id="titre"
            className="form-control"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="mission">Mission:</label>
          <textarea
            id="mission"
            className="form-control"
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="competence">Compétence:</label>
          <textarea
            id="competence"
            className="form-control"
            value={competence}
            onChange={(e) => setCompetence(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="atouts">Atouts:</label>
          <textarea
            id="atouts"
            className="form-control"
            value={atouts}
            onChange={(e) => setAtouts(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Créer Offre</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default CreateOffre;

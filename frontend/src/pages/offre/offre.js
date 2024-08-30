

import React, { useState, useEffect } from 'react';
import './offre.css';
import { FaSearch } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate

const SectionOffre = () => {
  const [offres, setOffres] = useState([]);
  const [filteredOffres, setFilteredOffres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Déclarez le hook useNavigate

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sectionOffres');
        setOffres(response.data);
        setFilteredOffres(response.data);
      } catch (error) {
        setMessage('Erreur lors du chargement des offres');
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffres();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredOffres(offres);
    } else {
      const filtered = offres.filter(offre =>
        offre.titre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOffres(filtered);
    }
  }, [searchTerm, offres]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredOffres(offres);
      return;
    }
    const filtered = offres.filter(offre =>
      offre.titre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOffres(filtered);
  };

  // Fonction pour gérer la redirection
  const handlePostuler = () => {
    navigate('/candidature'); // Redirection vers la page /candidature
  };

  return (
    <div className="offre">
      <div className={`search-container ${filteredOffres.length === 0 ? 'centered' : ''}`}>
        <h1>Rechercher une Offre</h1>
        <div className="search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="Recherche par titre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} className="search-button">
            <FaSearch />
          </button>
        </div>
        <div className="result-count text-center mt-3">
          {filteredOffres.length > 0 ? `${filteredOffres.length} résultat(s) trouvé(s)` : 'Aucun résultat trouvé'}
        </div>
      </div>
      {message && <div className="alert alert-info">{message}</div>}
      {filteredOffres.length > 0 && (
        <div className="job-results">
          {filteredOffres.map(offre => (
            <div className="small-card" key={offre._id}>
              <div className="card-body">
                <h5 className="card-title">{offre.titre}</h5>
              </div>
              <div className="card-footer">
                <button
                  className='voirbouton'
                  data-bs-toggle="modal"
                  data-bs-target={`#descriptionModal-${offre._id}`}
                >
                  Voir
                </button>
                <button 
                  className='postulerbouton'
                  onClick={handlePostuler} // Ajoutez l'événement onClick ici
                >
                  Postuler
                </button>
              </div>
              
              {/* Modal pour voir la description */}
              <div
                className="modal fade"
                id={`descriptionModal-${offre._id}`}
                tabIndex="-1"
                aria-labelledby="descriptionModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title text-center w-100" id="descriptionModalLabel">Description de l'Offre</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="description-section">
                        <strong>Description :</strong>
                        <p>{offre.description}</p>
                      </div>
                      <div className="mission-section">
                        <strong>Mission :</strong>
                        <p>{offre.mission}</p>
                      </div>
                      <div className="competence-section">
                        <strong>Compétence :</strong>
                        <p>{offre.competence}</p>
                      </div>
                      <div className="atouts-section">
                        <strong>Atouts :</strong>
                        <p>{offre.atouts}</p>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionOffre;


import React from 'react';
import './accueil.css';

const Accueil = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='acc'>
      <h1> HOAG-A2I</h1>
      <p>"Activités d'Intérim et d'Insertion professionnelle"</p>
      <div className='search-acc'>
        <input 
          type='text' 
          placeholder="Profil recherché"
          value={searchTerm} 
          onChange={handleSearchChange} 
          className='search-bar'
        />
        <button onClick={onSearch} className='search-button'>Rechercher</button>
      </div>
      <div className='acc-desc'>
        <p>
          Hoag A2I est au cœur des activités de <strong>Hoag Target</strong> et joue un rôle essentiel dans le domaine du recrutement 
          et de l'emploi à Madagascar. 
        </p>
      </div>
    </div>
  );
};

export default Accueil;

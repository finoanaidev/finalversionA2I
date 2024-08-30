import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event'; // Importez une icône appropriée pour Calendly
import './calendly.css'; // Assurez-vous de créer un fichier CSS pour styliser le bouton


const CalendlyButton = () => {
  const handleCalendlyClick = () => {
    // Remplacez cet URL par le lien de votre compte Calendly
    window.open('https://calendly.com/contact-hoagtarget', '_blank');
  };

  return (
    <div className="calendly-button">
        <Fab color="primary" aria-label="calendly" onClick={handleCalendlyClick}>
          <EventIcon /> {/* Remplacez par l'icône appropriée pour Calendly */}
        </Fab>
    </div>
  );
};

export default CalendlyButton;

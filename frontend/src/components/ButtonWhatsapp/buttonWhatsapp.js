import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './buttonWhatsapp.css'; // Assurez-vous de créer un fichier CSS pour styliser le bouton

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // Remplacez cet URL par le lien de votre compte WhatsApp
    window.open('https://wa.me/+261347048176', '_blank');

  };

  return (
    <div className="whatsapp-button">
      <Tooltip title="WhatsApp" arrow>
        <Fab color="primary" aria-label="whatsapp" onClick={handleWhatsAppClick}>
          <WhatsAppIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default WhatsAppButton;

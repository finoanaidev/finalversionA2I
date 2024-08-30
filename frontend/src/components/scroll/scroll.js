import React from 'react';
import { Fab } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import './scroll.css'; // Assurez-vous de créer un fichier CSS pour styliser le bouton

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="scroll-to-top">
      <Fab color="primary" aria-label="scroll-to-top" onClick={scrollToTop}>
        <KeyboardArrowUp />
      </Fab>
    </div>
  );
};

export default ScrollToTopButton;

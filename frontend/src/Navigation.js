import React from 'react';
import Activite from './pages/activite/activite';
import About from './pages/about/about';
import './App.css';
import WhatsAppButton from './components/ButtonWhatsapp/buttonWhatsapp'; // Importez votre composant
import CalendlyButton from './components/ButtonCalendly/calendly';
import ScrollToTopButton from './components/scroll/scroll'; 

function Navigation() {
  return (
    <div className="app-container">

    <div className="content">
      
      <div id='activite'><Activite /></div>
      <div id= "about"><About /></div>
      
      
    </div>
    <WhatsAppButton />
    <ScrollToTopButton />
    <WhatsAppButton />
    <CalendlyButton />
    
  </div>
  );
}

export default Navigation;


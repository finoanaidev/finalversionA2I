// models/Offre.js
const mongoose = require('mongoose');

const offreSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  mission: {
    type: String,
    required: true // Dépendant de si ce champ est obligatoire ou non
  },
  competence: {
    type: String, // Tableau de chaînes de caractères
    required: true // Dépendant de si ce champ est obligatoire ou non
  },
  atouts: {
    type: String, // Tableau de chaînes de caractères
    required: true // Dépendant de si ce champ est obligatoire ou non
  }
});

const Offre = mongoose.model('Offre', offreSchema);

module.exports = Offre;

const mongoose = require('mongoose');

const recrutementSchema = new mongoose.Schema({
  entreprise: { type: String, required: true },
  poste: { type: String, required: true },
  reference: { type: String, required: true },
  description: { type: String, required: true },
  mission: { type: String, required: true },
  resultat: { type: String, required: true },
  competenceObligatoire: { type: String, required: true },
  competenceSouhaite: { type: String, required: true },
  certificat: { type: String, required: true },
  autre: { type: String, required: true }
});

module.exports = mongoose.model('Recrutement', recrutementSchema);

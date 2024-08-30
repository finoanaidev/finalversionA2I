const mongoose = require('mongoose');

const CandidatureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prenom: { type: String, required: true },
  birthdate: { type: Date, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  currentPosition: { type: String, required: true },
  position: { type: String, required: true },
  employmentType: { type: String, required: true },
  experience: { type: String, required: true },
  jobDescription: { type: String, required: true },
  // otherPositions: { type: String, required: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  achievements: { type: String, required: true },
  skillsUsed: { type: String, required: true },
  skillsTitle: { type: String, required: true },
  outil: { type: String, required: true },
  skillsDescription: { type: String, required: true },
  skillsYears: { type: Number, required: true },
  certificat: { type: Number, required: true },
  skillsTitleTransversal: { type: String, required: true },
  skillsDescriptionTransversal: { type: String, required: true },
  skillsYearsTransversal: { type: Number, required: true },
});

module.exports = mongoose.model('Candidature', CandidatureSchema);

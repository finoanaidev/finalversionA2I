
const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  name: String,
  prenom: String,
  birthdate: Date,
  email: String,
  phone: String,
  currentPosition: String,
  position: String,
  employmentType: String,
  contractType: String,
  disponibilite: String,
  engagement: String,
  experience: String,
  jobDescription: String,
  jobTitle: String,
  company: String,
  location: String,
  startDate: Date,
  endDate: Date,
  achievements: String,
  skillsUsed: String,
  skillsTitle: String,
  outil: String,
  skillsDescription: String,
  skillsYears: Number,
  certificat: String,
  skillsTitleTransversal: String,
  skillsDescriptionTransversal: String,
  skillsYearsTransversal: Number,
  pdf: String,
});

module.exports = mongoose.model("PdfDetails", pdfSchema);

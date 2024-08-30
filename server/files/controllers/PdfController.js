// const Pdf = require("../models/PdfModel");

// const uploadFile = async (req, res) => {
//   const { title } = req.body;
//   const fileName = req.file.filename;
//   try {
//     await Pdf.create({ title: title, pdf: fileName });
//     res.send({ status: "ok" });
//   } catch (error) {
//     res.status(500).json({ error: "Une erreur est survenue lors du téléchargement du fichier." });
//   }
// };

// const getFiles = async (req, res) => {
//   try {
//     const files = await Pdf.find({});
//     res.send({ status: "ok", data: files });
//   } catch (error) {
//     res.status(500).json({ error: "Une erreur est survenue lors de la récupération des fichiers." });
//   }
// };

// module.exports = { uploadFile, getFiles };


const Pdf = require("../models/PdfModel");

const uploadFile = async (req, res) => {
  const {
    name, prenom, birthdate, email, phone, currentPosition, position, employmentType,
    contractType, disponibilite, engagement, experience, jobDescription, jobTitle,
    company, location, startDate, endDate, achievements, skillsUsed, skillsTitle,
    outil, skillsDescription, skillsYears, certificat, skillsTitleTransversal,
    skillsDescriptionTransversal, skillsYearsTransversal, title
  } = req.body;
  const fileName = req.file.filename;

  try {
    await Pdf.create({
      name, prenom, birthdate, email, phone, currentPosition, position, employmentType,
      contractType, disponibilite, engagement, experience, jobDescription, jobTitle,
      company, location, startDate, endDate, achievements, skillsUsed, skillsTitle,
      outil, skillsDescription, skillsYears, certificat, skillsTitleTransversal,
      skillsDescriptionTransversal, skillsYearsTransversal, title, pdf: fileName
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue lors du téléchargement du fichier." });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await Pdf.find({});
    res.send({ status: "ok", data: files });
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue lors de la récupération des fichiers." });
  }
};

module.exports = { uploadFile, getFiles };

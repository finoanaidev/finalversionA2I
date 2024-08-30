// const Pdf = require("../models/PdfModel");

// const uploadFile = async (req, res) => {
//   const {
//     name, prenom, birthdate, email, phone, currentPosition, position, employmentType,
//     contractType, disponibilite, engagement, experience, jobDescription, jobTitle,
//     company, location, startDate, endDate, achievements, skillsUsed, skillsTitle,
//     outil, skillsDescription, skillsYears, certificat, skillsTitleTransversal,
//     skillsDescriptionTransversal, skillsYearsTransversal
//   } = req.body;
//   const fileName = req.file.filename;

//   try {
//     await Pdf.create({
//       name, prenom, birthdate, email, phone, currentPosition, position, employmentType,
//       contractType, disponibilite, engagement, experience, jobDescription, jobTitle,
//       company, location, startDate, endDate, achievements, skillsUsed, skillsTitle,
//       outil, skillsDescription, skillsYears, certificat, skillsTitleTransversal,
//       skillsDescriptionTransversal, skillsYearsTransversal, pdf: fileName
//     });
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

// const updateFile = async (req, res) => {
//   const { id } = req.params;
//   const {
//     name, prenom, birthdate, email, phone, currentPosition, position, employmentType,
//     contractType, disponibilite, engagement, experience, jobDescription, jobTitle,
//     company, location, startDate, endDate, achievements, skillsUsed, skillsTitle,
//     outil, skillsDescription, skillsYears, certificat, skillsTitleTransversal,
//     skillsDescriptionTransversal, skillsYearsTransversal
//   } = req.body;
  
//   try {
//     const fileData = await Pdf.findById(id);
//     if (!fileData) {
//       return res.status(404).json({ error: "File not found" });
//     }

//     // If a new file is uploaded, update it
//     if (req.file) {
//       const oldFilePath = path.join(__dirname, '../files', fileData.pdf);
//       // Delete the old file from the server
//       fs.unlinkSync(oldFilePath);

//       fileData.pdf = req.file.filename; // Update the filename in the database
//     }

//     // Update other fields
//     fileData.name = name;
//     fileData.prenom = prenom;
//     fileData.birthdate = birthdate;
//     fileData.email = email;
//     fileData.phone = phone;
//     fileData.currentPosition = currentPosition;
//     fileData.position = position;
//     fileData.employmentType = employmentType;
//     fileData.contractType = contractType;
//     fileData.disponibilite = disponibilite;
//     fileData.engagement = engagement;
//     fileData.experience = experience;
//     fileData.jobDescription = jobDescription;
//     fileData.jobTitle = jobTitle;
//     fileData.company = company;
//     fileData.location = location;
//     fileData.startDate = startDate;
//     fileData.endDate = endDate;
//     fileData.achievements = achievements;
//     fileData.skillsUsed = skillsUsed;
//     fileData.skillsTitle = skillsTitle;
//     fileData.outil = outil;
//     fileData.skillsDescription = skillsDescription;
//     fileData.skillsYears = skillsYears;
//     fileData.certificat = certificat;
//     fileData.skillsTitleTransversal = skillsTitleTransversal;
//     fileData.skillsDescriptionTransversal = skillsDescriptionTransversal;
//     fileData.skillsYearsTransversal = skillsYearsTransversal;

//     await fileData.save();

//     res.send({ status: "ok", data: fileData });
//   } catch (error) {
//     res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour du fichier." });
//   }
// };

// const deleteFile = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const fileData = await Pdf.findById(id);
//     if (!fileData) {
//       return res.status(404).json({ error: "File not found" });
//     }

//     const filePath = path.join(__dirname, '../files', fileData.pdf);
    
//     // Delete the file from the server
//     fs.unlinkSync(filePath);

//     // Remove the record from the database
//     await Pdf.findByIdAndDelete(id);

//     res.send({ status: "ok", message: "File deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Une erreur est survenue lors de la suppression du fichier." });
//   }
// };

// module.exports = { uploadFile, getFiles, updateFile, deleteFile };


const Pdf = require("../models/PdfModel");
const fs = require('fs').promises;
const path = require('path');

const uploadFile = async (req, res) => {
  const {
    name, prenom, birthdate, email, phone, currentPosition, position, employmentType,
    contractType, disponibilite, engagement, experience, jobDescription, jobTitle,
    company, location, startDate, endDate, achievements, skillsUsed, skillsTitle,
    outil, skillsDescription, skillsYears, certificat, skillsTitleTransversal,
    skillsDescriptionTransversal, skillsYearsTransversal
  } = req.body;
  const fileName = req.file ? req.file.filename : null;

  if (!fileName) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    await Pdf.create({
      name, prenom, birthdate, email, phone, currentPosition, position, employmentType,
      contractType, disponibilite, engagement, experience, jobDescription, jobTitle,
      company, location, startDate, endDate, achievements, skillsUsed, skillsTitle,
      outil, skillsDescription, skillsYears, certificat, skillsTitleTransversal,
      skillsDescriptionTransversal, skillsYearsTransversal, pdf: fileName
    });
    res.send({ status: "ok" });
  } catch (error) {
    console.error("Error in uploadFile:", error);
    res.status(500).json({ error: "Une erreur est survenue lors du téléchargement du fichier." });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await Pdf.find({});
    res.send({ status: "ok", data: files });
  } catch (error) {
    console.error("Error in getFiles:", error);
    res.status(500).json({ error: "Une erreur est survenue lors de la récupération des fichiers." });
  }
};

const getFileById = async (req, res) => {
  const { id } = req.params;

  try {
    const fileData = await Pdf.findById(id);
    if (!fileData) {
      return res.status(404).json({ error: "File not found" });
    }
    res.send({ status: "ok", data: fileData });
  } catch (error) {
    console.error("Error in getFileById:", error);
    res.status(500).json({ error: "Une erreur est survenue lors de la récupération du fichier." });
  }
};

const updateFile = async (req, res) => {
  const { id } = req.params;
  const {
    name, prenom, birthdate, email, phone, currentPosition, position, employmentType,
    contractType, disponibilite, engagement, experience, jobDescription, jobTitle,
    company, location, startDate, endDate, achievements, skillsUsed, skillsTitle,
    outil, skillsDescription, skillsYears, certificat, skillsTitleTransversal,
    skillsDescriptionTransversal, skillsYearsTransversal
  } = req.body;

  try {
    const fileData = await Pdf.findById(id);
    if (!fileData) {
      return res.status(404).json({ error: "File not found" });
    }

    if (req.file) {
      const oldFilePath = path.join(__dirname, '../files', fileData.pdf);
      if (await fs.access(oldFilePath).then(() => true).catch(() => false)) {
        await fs.unlink(oldFilePath);
      }
      fileData.pdf = req.file.filename; // Update the filename in the database
    }

    // Update other fields
    fileData.name = name;
    fileData.prenom = prenom;
    fileData.birthdate = birthdate;
    fileData.email = email;
    fileData.phone = phone;
    fileData.currentPosition = currentPosition;
    fileData.position = position;
    fileData.employmentType = employmentType;
    fileData.contractType = contractType;
    fileData.disponibilite = disponibilite;
    fileData.engagement = engagement;
    fileData.experience = experience;
    fileData.jobDescription = jobDescription;
    fileData.jobTitle = jobTitle;
    fileData.company = company;
    fileData.location = location;
    fileData.startDate = startDate;
    fileData.endDate = endDate;
    fileData.achievements = achievements;
    fileData.skillsUsed = skillsUsed;
    fileData.skillsTitle = skillsTitle;
    fileData.outil = outil;
    fileData.skillsDescription = skillsDescription;
    fileData.skillsYears = skillsYears;
    fileData.certificat = certificat;
    fileData.skillsTitleTransversal = skillsTitleTransversal;
    fileData.skillsDescriptionTransversal = skillsDescriptionTransversal;
    fileData.skillsYearsTransversal = skillsYearsTransversal;

    await fileData.save();

    res.send({ status: "ok", data: fileData });
  } catch (error) {
    console.error("Error in updateFile:", error);
    res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour du fichier." });
  }
};

const deleteFile = async (req, res) => {
  const { id } = req.params;

  try {
    const fileData = await Pdf.findById(id);
    if (!fileData) {
      return res.status(404).json({ error: "File not found" });
    }

    const filePath = path.join(__dirname, '../files', fileData.pdf);
    if (await fs.access(filePath).then(() => true).catch(() => false)) {
      await fs.unlink(filePath);
    }

    await Pdf.findByIdAndDelete(id);

    res.send({ status: "ok", message: "File deleted successfully" });
  } catch (error) {
    console.error("Error in deleteFile:", error);
    res.status(500).json({ error: "Une erreur est survenue lors de la suppression du fichier." });
  }
};

module.exports = { uploadFile, getFiles, getFileById, updateFile, deleteFile };

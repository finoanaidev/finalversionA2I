const Offre = require('../models/Offre'); // Assurez-vous que le chemin vers votre modèle est correct

// Créer une offre
exports.createOffre = async (req, res) => {
  try {
    const { titre, description, mission, competence, atouts  } = req.body;
    const nouvelleOffre = new Offre({ titre, description, mission, competence, atouts });
    const offreSauvegardee = await nouvelleOffre.save();
    res.status(201).json(offreSauvegardee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir toutes les offres
exports.getAllOffres = async (req, res) => {
  try {
    const offres = await Offre.find();
    res.status(200).json(offres);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir une offre par son ID
exports.getOffreById = async (req, res) => {
  try {
    const offre = await Offre.findById(req.params.id);
    if (!offre) return res.status(404).json({ message: 'Offre non trouvée' });
    res.status(200).json(offre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une offre par son ID
exports.updateOffre = async (req, res) => {
  try {
    const { titre, description, mission, competence, atouts } = req.body;
    const offre = await Offre.findByIdAndUpdate(req.params.id, { titre, description, mission, competence, atouts }, { new: true });
    if (!offre) return res.status(404).json({ message: 'Offre non trouvée' });
    res.status(200).json(offre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une offre par son ID
exports.deleteOffre = async (req, res) => {
  try {
    const offre = await Offre.findByIdAndDelete(req.params.id);
    if (!offre) return res.status(404).json({ message: 'Offre non trouvée' });
    res.status(200).json({ message: 'Offre supprimée avec succès' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



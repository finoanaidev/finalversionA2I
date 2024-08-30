const Recrutement = require('../models/Recrutement');

// Créer une nouvelle offre d'emploi
exports.createRecrutement = async (req, res) => {
  try {
    const newRecrutement = new Recrutement(req.body);
    const savedRecrutement = await newRecrutement.save();
    res.status(201).json(savedRecrutement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer toutes les offres d'emploi
exports.getAllRecrutements = async (req, res) => {
  try {
    const recrutements = await Recrutement.find();
    res.status(200).json(recrutements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer les détails d'une offre d'emploi spécifique par ID
exports.getRecrutementById = async (req, res) => {
  try {
    const recrutement = await Recrutement.findById(req.params.id);
    if (!recrutement) {
      return res.status(404).json({ message: 'Offre d\'emploi non trouvée' });
    }
    res.status(200).json(recrutement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier une offre d'emploi
exports.updateRecrutement = async (req, res) => {
  try {
    const updatedRecrutement = await Recrutement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedRecrutement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une offre d'emploi
exports.deleteRecrutement = async (req, res) => {
  try {
    await Recrutement.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Offre supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

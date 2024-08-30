const Candidature = require('../models/Candidature');

// Soumettre une candidature
exports.createCandidature = async (req, res) => {
  try {
    const candidatureData = req.body;
    const candidature = new Candidature(candidatureData);
    await candidature.save();
    res.status(201).send({ message: 'Candidature soumise avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Une erreur est survenue lors de la soumission de la candidature.' });
  }
};

// Récupérer toutes les candidatures
exports.getAllCandidatures = async (req, res) => {
  try {
    const candidatures = await Candidature.find();
    res.status(200).json(candidatures);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Une erreur est survenue lors de la récupération des candidatures.' });
  }
};

// Récupérer une candidature par ID
exports.getCandidatureById = async (req, res) => {
  try {
    const candidature = await Candidature.findById(req.params.id);
    if (!candidature) {
      return res.status(404).send({ error: 'Candidature non trouvée.' });
    }
    res.status(200).json(candidature);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Une erreur est survenue lors de la récupération de la candidature.' });
  }
};

// Mettre à jour une candidature
exports.updateCandidature = async (req, res) => {
  try {
    const candidature = await Candidature.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!candidature) {
      return res.status(404).send({ error: 'Candidature non trouvée.' });
    }
    res.status(200).json(candidature);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Une erreur est survenue lors de la mise à jour de la candidature.' });
  }
};

// Supprimer une candidature
exports.deleteCandidature = async (req, res) => {
  try {
    const candidature = await Candidature.findByIdAndDelete(req.params.id);
    if (!candidature) {
      return res.status(404).send({ error: 'Candidature non trouvée.' });
    }
    res.status(200).send({ message: 'Candidature supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Une erreur est survenue lors de la suppression de la candidature.' });
  }
};

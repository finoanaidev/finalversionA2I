const express = require('express');
const router = express.Router();
const candidatureController = require('../controllers/candidatureController');

// Route pour soumettre une candidature avec upload de fichier
router.post('/candidature', candidatureController.createCandidature);

// Autres routes CRUD pour la candidature
router.get('/candidatures', candidatureController.getAllCandidatures);
router.get('/candidatures/:id', candidatureController.getCandidatureById);
router.put('/candidatures/:id', candidatureController.updateCandidature);
router.delete('/candidatures/:id', candidatureController.deleteCandidature);

module.exports = router;

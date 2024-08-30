const express = require('express');
const router = express.Router();
const offreController = require('../controllers/offreController');

// Route pour créer une offre
router.post('/sectionOffres', offreController.createOffre);

// Route pour obtenir toutes les offres
router.get('/sectionOffres', offreController.getAllOffres);

// Route pour obtenir une offre par son ID
router.get('/sectionOffres/:id', offreController.getOffreById);

// Route pour mettre à jour une offre par son ID
router.put('/sectionOffres/:id', offreController.updateOffre);

// Route pour supprimer une offre par son ID
router.delete('/sectionOffres/:id', offreController.deleteOffre);
  


module.exports = router;

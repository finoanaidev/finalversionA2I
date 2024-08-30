const express = require('express');
const router = express.Router();
const { getAllRecrutements, createRecrutement, updateRecrutement, deleteRecrutement, getRecrutementById } = require('../controllers/recrutementController');

// Route pour créer une nouvelle offre d'emploi
router.post('/', createRecrutement);

// Route pour récupérer toutes les offres d'emploi
router.get('/', getAllRecrutements);

// Route pour récupérer les détails d'une offre d'emploi spécifique
router.get('/:id', getRecrutementById);

// Route pour modifier une offre d'emploi
router.put('/:id', updateRecrutement);

// Route pour supprimer une offre d'emploi
router.delete('/:id', deleteRecrutement);

module.exports = router;

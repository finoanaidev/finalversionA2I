// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Simulez une fonction de validation de token
function validateToken(token, userRole) {
  // Ici, vous devriez vérifier le token avec votre base de données ou votre service d'authentification
  if (userRole === 'candidat' || userRole === 'recruteur') {
    return { isValid: true, userRole };
  } else {
    return { isValid: false, errorMessage: 'Rôle utilisateur non valide' };
  }
}

router.post('/validateToken', (req, res) => {
  const { token, userRole } = req.body; // Ajoutez userRole à partir de req.body
  if (!token || !userRole) {
    return res.status(400).json({ isValid: false, errorMessage: 'Token et/ou rôle utilisateur manquants' });
  }

  try {
    const result = validateToken(token, userRole); // Passez userRole à la fonction validateToken
    if (result.isValid) {
      res.json(result);
    } else {
      res.status(401).json({ isValid: false, errorMessage: result.errorMessage });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ isValid: false, errorMessage: 'Erreur serveur' });
  }
});

module.exports = router;

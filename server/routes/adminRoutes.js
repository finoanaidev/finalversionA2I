const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const Admin = require('../models/UserAdmin'); // Assurez-vous d'importer correctement le modèle d'administrateur

// @route   POST api/registerAdmin
// @desc    Register an admin
// @access  Public
router.post(
  '/registerAdmin',
  [
    // Ajoutez des validations si nécessaire, par exemple :
    check('nomAdmin', 'Le nom est requis').not().isEmpty(),
    check('mailAdmin', 'Veuillez inclure un email valide').isEmail(),
    check('passwordAdmin', 'Veuillez entrer un mot de passe avec 6 caractères ou plus').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nomAdmin, mailAdmin, passwordAdmin } = req.body;

    try {
      let admin = await Admin.findOne({ mailAdmin });

      if (admin) {
        return res.status(400).json({ errors: [{ param: 'mailAdmin', msg: 'L\'utilisateur existe déjà' }] });
      }

      admin = new Admin({
        nomAdmin,
        mailAdmin,
        passwordAdmin,
      });

      const salt = await bcrypt.genSalt(10);
      admin.passwordAdmin = await bcrypt.hash(passwordAdmin, salt);

      await admin.save();

      const payload = {
        user: {
          id: admin.id,
        },
      };

      jwt.sign(
        payload,
        'yourSecretToken', // Change this to your secret token
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: 'Erreur serveur' }] });
    }
  }
);

// @route   POST api/loginAdmin
// @desc    Login admin and get token
// @access  Public
router.post(
  '/loginAdmin',
  [
    check('mailAdmin', 'Veuillez inclure un email valide').isEmail(),
    check('passwordAdmin', 'Le mot de passe est requis').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mailAdmin, passwordAdmin } = req.body;

    try {
      let admin = await Admin.findOne({ mailAdmin });

      if (!admin) {
        return res.status(400).json({ errors: [{ param: 'mailAdmin', msg: 'Identifiants invalides' }] });
      }

      const isMatch = await bcrypt.compare(passwordAdmin, admin.passwordAdmin);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ param: 'passwordAdmin', msg: 'Identifiants invalides' }] });
      }

      const payload = {
        user: {
          id: admin.id,
        },
      };

      jwt.sign(
        payload,
        'yourSecretToken', // Change this to your secret token
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: 'Erreur serveur' }] });
    }
  }
);

module.exports = router;

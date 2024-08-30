// routes/googleUserRoutes.js
const express = require('express');
const { googleLogin } = require('../controllers/googleUserController');

const router = express.Router();

router.post('/google-login', googleLogin);

module.exports = router;

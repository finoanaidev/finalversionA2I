const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/googleUserModel');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    // Vérifier le token Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Rechercher l'utilisateur dans la base de données (ou créer un nouvel utilisateur)
    let user = findUserByEmail(email);

    if (!user) {
      user = createUser(email, name);
    }

    // Créer un jeton JWT
    const jwtToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.SECRET_KEY, // Utilisez la variable d'environnement ici
      { expiresIn: '1h' }
    );

    res.json({ token: jwtToken, user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token Google invalide' });
  }
};

module.exports = {
  googleLogin
};

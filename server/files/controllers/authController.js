<<<<<<< HEAD
=======
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//   const { nom, email, password, confirmPassword, role } = req.body;

//   if (password !== confirmPassword) {
//     return res
//       .status(400)
//       .json({ msg: "Les mots de passe ne correspondent pas" });
//   }

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: "L'utilisateur existe déjà" });
//     }

//     user = new User({
//       nom,
//       email,
//       password,
//       role,
//     });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     await user.save();

//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };

//     jwt.sign(
//       payload,
//       "secret", // Replacer 'secret' par sercet key de l'appl
//       { expiresIn: 3600 },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }

//   exports.login = async (req, res) => {
//     const { email, password, role } = req.body;

//     try {
//       let user = await User.findOne({ email });

//       if (!user) {
//         return res.status(400).json({ msg: "Identifiants invalides" });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);

//       if (!isMatch) {
//         return res.status(400).json({ msg: "Identifiants invalides" });
//       }

//       const payload = {
//         user: {
//           id: user.id,
//           role: role,
//         },
//       };

//       jwt.sign(
//         payload,
//         "yourSecretToken", // Change this to your secret token
//         { expiresIn: 3600 },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Erreur serveur");
//     }
//   };
// };

>>>>>>> aa33050fa4685e296e655e08e4d9418e1abc4584
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
<<<<<<< HEAD
  const { nom, email, password, confirmPassword } = req.body;
=======
  const { nom, email, password, confirmPassword, role } = req.body;
>>>>>>> aa33050fa4685e296e655e08e4d9418e1abc4584

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ msg: "Les mots de passe ne correspondent pas" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "L'utilisateur existe déjà" });
    }

    user = new User({
      nom,
      email,
      password,
<<<<<<< HEAD
=======
      role, // Assurez-vous que ce champ est bien défini ici
>>>>>>> aa33050fa4685e296e655e08e4d9418e1abc4584
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
<<<<<<< HEAD
=======
        role: user.role, // Inclure le rôle dans le payload JWT
>>>>>>> aa33050fa4685e296e655e08e4d9418e1abc4584
      },
    };

    jwt.sign(
      payload,
<<<<<<< HEAD
      "secret", // Replacer 'secret' par sercet key de l'appl
=======
      "secret", // Remplacez par votre clé secrète
>>>>>>> aa33050fa4685e296e655e08e4d9418e1abc4584
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
<<<<<<< HEAD
    res.status(500).send("Server error");
  }

  exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Identifiants invalides" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Identifiants invalides" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "yourSecretToken", // Change this to your secret token
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur serveur");
    }
  };
=======
    res.status(500).send("Erreur serveur");
  }
};
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Identifiants invalides' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Identifiants invalides' });
    }

    if (user.role !== role) {
      return res.status(400).json({ msg: 'Role invalide pour cet utilisateur' });
    }

    // Générer le token JWT et le renvoyer au client
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, 'yourSecretToken', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
>>>>>>> aa33050fa4685e296e655e08e4d9418e1abc4584
};

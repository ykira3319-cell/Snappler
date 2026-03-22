const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  User.createUser({ name, email, password: hashedPassword }, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Utilisateur créé ✅");
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.send("Utilisateur non trouvé");

    const user = results[0];
    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) return res.send("Mot de passe incorrect");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.json({ message: "Connexion réussie", token });
  });
};

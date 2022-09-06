const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

// console.log(process.env.JWT_KEY_TOKEN);

// pour l'inscription POST
exports.signup = (req, res, next) => {
  bcrypt // hachage du mot de passe
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash, // le mot de passe haché est enregistré dans la bdd
        isAdmin: false,
      });

      const token = jwt.sign({ id: user.id }, process.env.JWT_KEY_TOKEN, {
        expiresIn: 86400, // 24 hours
      });

      user
        .save()
        .then(() =>
          res.status(201).json({
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token,
          })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// pour la connexion POST

exports.login = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: "Utilisateur non trouvé." });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "Utilisateur non trouvé." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Mot de passe incorrect!" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY_TOKEN, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  });
};

//pour la deconnexion (efface la session)
exports.logout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "Vous êtes déconnecté!" });
  } catch (err) {
    this.next(err);
  }
};

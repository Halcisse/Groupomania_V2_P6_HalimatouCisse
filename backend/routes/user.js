const express = require("express");
const router = express.Router();

//les routes pour l'authentification (connexion inscription deconnexion)
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const password = require("../middleware/password"); // on vérifie la validité du mdp

router.post("/signup", password, userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/logout", auth, userCtrl.logout);

// router.get("/", auth, userCtrl.getAllUser);
// router.get("/:id", auth, userCtrl.getOneUser);
// router.delete("/delete", auth, userCtrl.deleteUser);

module.exports = router;

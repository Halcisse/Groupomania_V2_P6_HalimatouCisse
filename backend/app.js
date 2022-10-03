const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
const cors = require("cors");

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Il y a eu trop de requêtes depuis cette adresse IP!",
// });
// parse requests of content-type - application/json
app.use(express.json());

// on definit les routes principales
const userRoute = require("./routes/user");
const PostRoute = require("./routes/posts");

//Connexion à la base de donnée avec Mongoose
mongoose
  .connect(
    "mongodb+srv://Groupomania_bd:m4PWbYAnO407bOWV@cluster0.a34roiw.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//permet de gérer les erreurs de connexion sur plusieurs serveurs (CORS)

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

app.use(express.json()); // les requetes entrantes sont parsés en json
// app.use(limiter); // Sécurise l'authentification
// app.use(
//   helmet({
//     crossOriginResourcePolicy: false,
//   })
// ); // Sécurise le serveur Express

app.use("/api/auth", userRoute);
app.use("/api/posts", PostRoute);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;

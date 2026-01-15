/** On fait appel à la librairie express */
const express = require("express");
/** On utilise express */
const server = express();
/** On omporte mongoose */
const mongoose = require("mongoose");

const { PORT, DB_CONNECTION } = process.env;

/** Permet avec ce code d'envoyer du json(pour les requêtes 'post' par exemple) */
server.use(express.json());

const logMiddleware = require("./middlewares/log.middleware");
/** Utilisation d'un middleware qu'on a fait */
server.use(logMiddleware());

// Connection DB
// On va créer un middleware qui établit une conection à chaque requête
server.use(async (req, res, next) => {
  // Pour établir la connexion, nous avons besoin d'importer mongoose (voir tout en haut)
  // A partir de cet objet mongoose, nous pouvons créer une nouvelle connexion peut prendre du temps
  // Ou peut échouer, donc la méthode pour se connecter nous renvoie une Promise.
  // Il faut donc utiliser .then.catch soit le async/await avec le try/catch (plus propre)
  try {
    // On va essayer de se connecter
    await mongoose.connect(DB_CONNECTION, { dbName: "TaskManager" });

    console.log("Successfully connected to the DB");

    next(); // Si on a réussi à se connecter à la DB, on continue la requête
  } catch (err) {
    // Si la connexio, échoue, on va écrire le message d'erreur dans la console
    console.log(` Connection Failed \n[Reason]\n ${err} `);

    res.status(500).json({
      statusCode: 500,
      message: "Impossible de se conncter à la base de données",
    });
  }
});

/** On doit importer le router */
const router = require("./routes");
/** Et déclarer que l'on utilise celui-ci sur le server */
server.use("/api", router);

server.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`);
});

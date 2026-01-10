/** On fait appel à la librairie express */
const express = require ('express');
/** On utilise express */
const server = express();

const { PORT } = process.env;

/** Permet avec ce code d'envoyer du json(pour les requêtes 'post' par exemple) */
server.use(express.json());

/** On doit importer le router */
const router = require('./routes');
/** Et déclarer que l'on utilise celui-ci sur le server */
server.use('/api', router);

server.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`);
})

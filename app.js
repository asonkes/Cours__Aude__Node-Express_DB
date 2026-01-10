/** On fait appel à la librairie express */
const express = require ('express');
/** On utilise express */
const server = express();

const { PORT } = process.env;

/** On doit importer le router */
const router = require('./routes');
/** Et déclarer que l'on utilise celui-ci sur le server */
server.use('/api', router);

server.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`);
})

/** On fait appel à la librairie express */
const express = require ('express');
/** On utilise express */
const server = express();

const { PORT } = process.env;

server.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`);
})

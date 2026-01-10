/******************************/
/** Ici on est dans le router */
/******************************/

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Bienvenue sur le router de l'API de cet exercice !");
});

module.exports = router;
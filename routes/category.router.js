/*****************************************/
/** Ici on est sur la page des cétgories */
/*****************************************/

const categoryRouter = require('express').Router();

categoryRouter.get('/', (req, res) => {
    res.send('Bienvenue sur la page des catégories', 200);
});

module.exports = categoryRouter;
/*****************************************/
/** Ici on est sur la page des cétgories */
/*****************************************/

const categoryRouter = require('express').Router();

/** Ici c'est pour toutes les catégories */
categoryRouter.get('/', (req, res) => {
    res.send('Bienvenue sur la page des catégories', 200);
});

/** Ici c'est pour une catégorie en particulier */
categoryRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Bienvenue sur la page de la catégorie ${id}`);
});

module.exports = categoryRouter;
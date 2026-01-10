/*****************************************/
/** Ici on est sur la page des cétgories */
/*****************************************/

const categoryRouter = require('express').Router();

/** Ici c'est pour récupérer toutes les catégories */
categoryRouter.get('/', (req, res) => {
    res.send('Bienvenue sur la page des catégories', 200);
});

/** Ici c'est pour récupérer une catégorie en particulier */
categoryRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Bienvenue sur la page de la catégorie ${id}`, 200);
});

/** Ici c'est pour ajouter une catégorie */
categoryRouter.post('/', (req, res) => {
    const categoryAdd = req.body;
    res.send(categoryAdd, 201);
});

/** Ici, c'est pour modifier une catégorie en particulier */
categoryRouter.put('/:id', (req,res) => {
    const categoryId = req.params.id;
    const categoryUpdated = req.body;

    categoryUpdated.id = categoryId;
    res.send(categoryUpdated, 200); 
}); 

/** Ici c'est pour supprimer une catégorie en particulier */
categoryRouter.delete('/:id', (req, res) => {
    res.sendStatus(204);
})

module.exports = categoryRouter;
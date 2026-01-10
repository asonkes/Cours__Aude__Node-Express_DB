/*********************************************/
/** Ici on se trouve sur la route des tâches */
/*********************************************/

const taskRouter = require('express').Router();

/** Ici c'est pour récupérer toutes les tâches */
taskRouter.get('/', (req, res) => {
    res.send("Bienvenue sur la page des tâches", 200);
});

/** Ici c'est pour récupérer une tâche précise */
taskRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Bienvenue sur la tâche ${id}`);
});

module.exports = taskRouter;
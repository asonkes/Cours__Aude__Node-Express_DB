/*********************************************/
/** Ici on se trouve sur la route des tâches */
/*********************************************/

const taskRouter = require('express').Router();

taskRouter.get('/', (req, res) => {
    res.send("Bienvenue sur la page des tâches", 200);
})

module.exports = taskRouter;
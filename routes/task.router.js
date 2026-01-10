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
    res.send(`Bienvenue sur la tâche ${id}`, 200);
});

/** Ici c'est pour récupérer les t^ches d'un utilisateur */
taskRouter.get('/user/:name', (req, res) => {
    const userName = req.params.name;
    res.send(`Bienvenue sur les tâches de l'utilisateur ${userName}`, 200);
});

/** Ici c'est pour ajouter une tâche (pas besoin d'id) */
taskRouter.post('/', (req, res) => {
    const taskAdd = req.body;
    res.send(taskAdd, 201);
});

/** Ici c'est pour modifier une tâche précise */
taskRouter.put('/:id', (req, res) => {
    /** On prend l'id de l'url */
    const taskId = req.params.id;
    /** On prend le corps de la tâche que l'on ajoute (les informations) */
    const taskUpdated = req.body;
    /** taskUpdated.id ==> id qu'il y a dans les infos json = id de l'url */
    /** id de l'url 'écrase' l'id dans les données que l'on envoie */
    taskUpdated.id = taskId;

    res.send(taskUpdated, 200);
});

/** Ici c'est pour modifier uniquement le statut 'isDone' des données du 'body' */
taskRouter.patch('/:id', (req, res) => {
    const updatedTask = {
        id: req.params.id,
        isDone: req.body.isDone
    };

    res.send(updatedTask, 200);
});

/** Ici c'est pour supprimer une tâche */
taskRouter.delete('/:id', (req, res) => {
    res.sendStatus(204);
});

module.exports = taskRouter;
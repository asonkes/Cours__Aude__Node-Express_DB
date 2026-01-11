/*****************************************/
/** On est dans le controller des tâches */
/*****************************************/
const {Request, Response} = require('express');
const fakeTaskService = require("../services/fake/fakeTask.service");

const taskController = {

    /**
     * Permet de récupérer toutes les tâches
     * @param {Request} req 
     * @param {Response} res 
     */
    getAll: (req, res) => {
        const tasks = fakeTaskService.find();

        const dataToSend = {
            count: tasks.length,
            tasks
        }

        res.status(200).json(dataToSend);
    },

    /**
     * Récuopérer une tâche avec un id spécifique
     * @param {Request} req 
     * @param {Response} res 
     */
    getById: (req, res) => {
        /** Permet de transformer l'id en nombre */
        /** L'id à la base est tdéjà trouvé par 'findById() */
        const id = +req.params.id;
        const task = fakeTaskService.findById(id);

        if(!task) {
            res.status(404).json({
                StatusCode: 404,
                message: `La tâche ${id} n'existe pas !`
            });
        }

        res.status(200).json(task);
    },

    /**
     * Récupérer les tâches d'un user
     * @param {Request} req 
     * @param {Response} res 
     */
    getByUser: (req, res) => {
        const userName = req.params.name;

        // version 1 - ce que je vous demandais
        /**
         * const tasks = fakeTaskService.findAssignedTo(userName);
         * res.status(200).json(tasks);
         * 
        */
        
        // version 2 - le pimp
        // TODO, on souhaite afficher les tâches attribuées à l'utilisateur + les tâches que l
        // Ici tâches que le 'userName' doit faire
        const tasksToDo = fakeTaskService.findAssignedTo(userName);
        
        // Ici les tâches que le 'userName' aura donné à quelqu'un
        const tasksGiven = fakeTaskService.findGivenBy(userName);

        const dataToSend = {
            tasksToDo,
            tasksGiven
        }

        /** On fait ça sous forme d'objet, car on peut pas faire :
         * res.status(200).json()
        */
        res.status(200).json(dataToSend);

    },

    /**
     * Ici on va ajouter une tâche
     * @param {Request} req 
     * @param {Response} res 
     */
    insert: (req, res) => {
        const taskToAdd = req.body;

        /** Si la tâche existe déjà en DB ==> erreur
         * Donc si renvoie 'true' */
        if(fakeTaskService.nameAlreadyExists(taskToAdd.name)) {
            res.status(409).json({
                StatusCode: 409,
                message: `La tâche ${taskToAdd.name} existe déjà !`
            })
        }

        /** Si la tâche n'existe pas, on peut faire l'insertion */
        const insertedtask = fakeTaskService.create(taskToAdd);
        /** On donne ensuite accès à l'url qui permettra de consulter la nouvelle tâche insérée */
        res.location(`/api/tasks/${insertedtask}`);
        res.status(201).json(insertedtask);
    },

    /**
     * Ici, on va modifier le status d'une des données de la tâche(ici ==> 'isDone')
     * @param {Request} req 
     * @param {Response} res 
     */
    updateStatus: (req, res) => {
        /** On transforme l'id en nombre */
        const id = +req.params.id;
        /** Et on va chercher le nouveau statut renseigné par l'utilisateur */
        const newStatus = req.body.isDone;

        /** On va d'abord vérifier si elle existe */
        /** On peut reprendre dans le service 'findById' car si l'id n'existe pas, on arrete */
        const task = fakeTaskService.findById(id);
        if(!task) {
            res.status(404).json({
                StatusCode: 404,
                message: `La tâche que vous essayez de modifier n\'existe pas !`
            });
        }

        /** Si la tâche existe, on peut la modifier */
        const updateTask = fakeTaskService.updateStatus(id, newStatus);
        res.status(200).json(updateTask);
    },

    /**
     * Ici on va modifier une tâche (plusieurs éléments à l'intérieur)
     * @param {Request} req 
     * @param {Response} res 
     */
    update: (req, res) => {
        const id = +req.params.id;
        const newTaskInfos = req.body;

        const task = fakeTaskService.findById(id);

        if(!task) {
            res.status(404).json({
                StatusCode: 404, 
                message: `La tâche que vous essayez de modifier n\'existe pas !`
            });
        }

        /** Si la tâche existe */
        const updatedTask = fakeTaskService.update(id, newTaskInfos);
        res.status(200).json(updatedTask);
    },

    /**
     * Ici on va supprimer une tâche
     * @param {Request} req 
     * @param {Response} res 
     */
    delete: (req, res) => {
        const id = +req.params.id;

        /** Si on nous renvoie l'id, c'est ok */
        if(fakeTaskService.delete(id)) {
            /** On renvoie '204' ==> 'noContent' */
            res.sendStatus(204);
        } else {
            /** Si ne renvoi pas l'id ==> 404 ==> tâche existe pas */
            res.status(404).json({
                StatusCode: 404,
                message: 'Suppression impossible, la tâche n\'existe pas'
            });
        }
    }
}

module.exports = taskController;
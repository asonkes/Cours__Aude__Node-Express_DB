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
        const tasks = fakeTaskService.findAssignedTo(userName);
        res.status(200).json(tasks);
        
        // version 2 - le pimp
        // On souhaite afficher les tâches attribuées à l'utilisateur + ses tâches que lui a assigné 
    },

    insert: (req, res) => {
        res.sendStatus(501);
    },

    update: (req, res) => {
        res.sendStatus(501);
    },

    updateStatus: (req, res) => {
        res.sendStatus(501);
    },

    delete: (req, res) => {
        res.sendStatus(501);
    }
}

module.exports = taskController;
/*****************************************/
/** On est dans le controller des tâches */
/*****************************************/
const {Request, Response} = require('express');
const fakeTaskService = require("../services/fake/fakeTask.service");

const taskController = {

    /**
     * 
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
     * 
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
                message: "Tâche non trouvée"
            });
        }

        res.status(200).json(task);
    },

    getByUser: (req, res) => {
        res.sendStatus(501);
    },

    create: (req, res) => {
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
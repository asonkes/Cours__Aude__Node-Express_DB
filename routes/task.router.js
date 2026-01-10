/*********************************************/
/** Ici on se trouve sur la route des tâches */
/*********************************************/

const taskController = require('../controllers/task.controller');
const taskRouter = require('express').Router();

/** Routes sans besoin 'd'id' */
taskRouter
.route('/')
.get(taskController.getAll)
.post(taskController.create);

/** Routes avec 'id' */
taskRouter
.route('/:id')
.get(taskController.getById)
.put(taskController.update)
.patch(taskController.updateStatus)
.delete(taskController.delete)

/** Ici c'est pour récupérer les tâches d'un utilisateur */
taskRouter
.route('/user/:name')
.get(taskController.getByUser);

module.exports = taskRouter;
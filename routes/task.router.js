/*********************************************/
/** Ici on se trouve sur la route des tâches */
/*********************************************/

const taskController = require('../controllers/task.controller');
const idValidatorMiddleware = require('../middlewares/idValidator.middleware');
const taskRouter = require('express').Router();

/** Routes sans besoin 'd'id' */
taskRouter
.route('/')
.get(taskController.getAll)
.post(taskController.insert);

/** Routes avec 'id' */
taskRouter
.route('/:id')
.get(idValidatorMiddleware(), taskController.getById)
.put(idValidatorMiddleware(), taskController.update)
.patch(idValidatorMiddleware(), taskController.updateStatus)
.delete(idValidatorMiddleware(), taskController.delete)

/** Ici c'est pour récupérer les tâches d'un utilisateur */
taskRouter
.route('/user/:name')
.get(taskController.getByUser);

module.exports = taskRouter;
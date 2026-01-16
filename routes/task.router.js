/*********************************************/
/** Ici on se trouve sur la route des tâches */
/*********************************************/

const taskController = require("../controllers/task.controller");
const bodyValidatorMiddleware = require("../middlewares/bodyValidator.middleware");

const taskRouter = require("express").Router();

/** Routes sans besoin 'd'id' */
taskRouter.route("/").get(taskController.getAll).post(taskController.insert);

/** Routes avec 'id' */
taskRouter
  .route("/:id")
  .get(taskController.getById)
  .put(bodyValidatorMiddleware(), taskController.update)
  .patch(taskController.updateStatus)
  .delete(taskController.delete);

/** Ici c'est pour récupérer les tâches d'un utilisateur */
taskRouter.route("/user/:name").get(taskController.getByUser);

module.exports = taskRouter;

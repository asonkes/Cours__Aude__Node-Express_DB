/*********************************************/
/** Ici on se trouve sur la route des tâches */
/*********************************************/

const taskController = require("../controllers/task.controller");
// Middleware pour le token
const authentificationMiddleware = require("../middlewares/auth/authentification.middleware");
const userAuthorizationMiddleware = require("../middlewares/auth/userAuthorization.middleware");
const bodyValidatorMiddleware = require("../middlewares/bodyValidator.middleware");

const taskRouter = require("express").Router();

/** Routes sans besoin 'd'id' */
taskRouter
  .route("/")
  .get(taskController.getAll)
  .post(
    authentificationMiddleware(),
    bodyValidatorMiddleware(),
    taskController.insert,
  );

/** Routes avec 'id' */
taskRouter
  .route("/:id")
  .get(taskController.getById)
  .put(bodyValidatorMiddleware(), taskController.update)
  .patch(taskController.updateStatus)
  .delete(bodyValidatorMiddleware(), taskController.delete);

/** Ici c'est pour récupérer les tâches d'un utilisateur */
taskRouter
  .route("/user/:id")
  .get(
    authentificationMiddleware(),
    userAuthorizationMiddleware(),
    taskController.getByUser,
  );

module.exports = taskRouter;

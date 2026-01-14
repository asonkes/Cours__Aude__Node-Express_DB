/*****************************************/
/** Ici on est sur la page des cétgories */
/*****************************************/

const categoryController = require("../controllers/category.controller");
const categoryRouter = require("express").Router();
const bodyValidatorMiddleware = require("../middlewares/bodyValidator.middleware");
const idValidatorMiddleware = require("../middlewares/idValidator.middleware");

/** Routes sans besoin 'd'id' */
categoryRouter
  .route("/")
  .get(categoryController.getAll)
  .post(bodyValidatorMiddleware(), categoryController.insert);

/** Routes avec 'id' */
categoryRouter
  .route("/:id")
  .get(idValidatorMiddleware(), categoryController.getById)
  .put(idValidatorMiddleware(), categoryController.update)
  .delete(idValidatorMiddleware(), categoryController.delete);

module.exports = categoryRouter;

/*****************************************/
/** Ici on est sur la page des cétgories */
/*****************************************/

const categoryController = require("../controllers/category.controller");
const categoryRouter = require("express").Router();
const bodyValidatorMiddleware = require("../middlewares/bodyValidator.middleware");

/** Routes sans besoin 'd'id' */
categoryRouter
  .route("/")
  .get(categoryController.getAll)
  .post(bodyValidatorMiddleware(), categoryController.insert);

/** Routes avec 'id' */
categoryRouter
  .route("/:id")
  .get(categoryController.getById)
  .put(bodyValidatorMiddleware(), categoryController.update)
  .delete(categoryController.delete);

module.exports = categoryRouter;

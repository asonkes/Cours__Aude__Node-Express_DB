/*****************************************/
/** Ici on est sur la page des cétgories */
/*****************************************/

const categoryController = require("../controllers/category.controller");
const categoryRouter = require("express").Router();
const bodyValidatorMiddleware = require("../middlewares/bodyValidator.middleware");
// Import du middleware  pour indiquer que le token est obligatoire
// Celui-ci il va voir s'il y a un token (jeton)
const authentificationMiddleware = require("../middlewares/auth/authentification.middleware");
// Import du middleware pour bloquer une route à des rôles en particulier
// Et lui, il va vérifier si la personne qui tente de se connecter à le bon rôle
const roleAuthorizationMiddleware = require("../middlewares/auth/roleAuthorization.middleware");

/** Routes sans besoin 'd'id' */
categoryRouter
  .route("/")
  .get(categoryController.getAll)
  .post(
    authentificationMiddleware(),
    roleAuthorizationMiddleware(["Admin"]),
    bodyValidatorMiddleware(),
    categoryController.insert,
  );

/** Routes avec 'id' */
categoryRouter
  .route("/:id")
  .get(categoryController.getById)
  .put(
    authentificationMiddleware(),
    roleAuthorizationMiddleware(),
    bodyValidatorMiddleware(),
    categoryController.update,
  )
  .delete(
    authentificationMiddleware(),
    roleAuthorizationMiddleware(),
    categoryController.delete,
  );

module.exports = categoryRouter;

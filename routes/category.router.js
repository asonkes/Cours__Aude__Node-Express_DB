/*****************************************/
/** Ici on est sur la page des cétgories */
/*****************************************/

const categoryController = require('../controllers/category.controller');
const categoryRouter = require('express').Router();

/** Routes sans besoin 'd'id' */
categoryRouter
.route('/')
.get(categoryController.getAll)
.post(categoryController.insert);

/** Routes avec 'id' */
categoryRouter
.route('/:id')
.get(categoryController.getById)
.put(categoryController.update)
.delete(categoryController.delete);

module.exports = categoryRouter;
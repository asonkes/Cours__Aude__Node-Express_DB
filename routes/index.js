/******************************/
/** Ici on est dans le router */
/******************************/

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Bienvenue sur le router de l'API de cet exercice !", 200);
});

/** Ici je dois importer 'taskRouter' */
const taskRouter = require('./task.router');
/** Et dire que le router va l'utiliser + route */
router.use('/tasks', taskRouter);


/** Ici je dois importer 'categoryRouter */
const categoryRouter = require('./category.router');
/** Et dire que le router va l'utiliser+ route */
router.use('/categories', categoryRouter);

module.exports = router;
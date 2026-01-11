/*************************************************/
/** Ici on est dans le controller des catégories */
/*************************************************/

const fakeCategoryService = require("../services/fake/fakeCategory.service");

const  categoryController = {

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getAll: (req, res) => {
        const categories = fakeCategoryService.find();

        const dataToSend = {
            count: categories.length,
            categories
        };

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
        const category = fakeCategoryService.findById(id);

        if(!category) {
            res.status(404).json({
                statusCode: 404,
                message: `La catégorie ${id} n'existe pas !`
            });
        }

        res.status(200).json(category);
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    insert: (req, res) => {
        const categoryToAdd= req.body;

        /** Si le nom existe déjà en BD ==> erreur */
        /** Donc si renvoie 'true' */
        if(fakeCategoryService.nameAlreadyExists(categoryToAdd.name)) {
            res.status(409).json({
                statusCode: 409,
                message: `La catégorie ${categoryToAdd.name} existe déjà !`
            });
        }

        /** Si le nom n'existe pas, on peut faire la création */
        /** On met create car on reprend la méthode dans le service */
        /** Et on met en paramètre : 'categoryAdd' (la category à ajouter) */
        const insertedCategory = fakeCategoryService.create(categoryToAdd);
        /** location ==> on donne l'accès à l'url qui permettra de consulter cette nouvelle donnée */
        res.location(`/api/categories/${insertedCategory}`);
        res.status(201).json(insertedCategory);
    }, 

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    update: (req, res) => {
        const id = +req.params.id;
        const newCategoryInfos = req.body;

        if(!category) {
            res.status(404).json({
                statusCode: 404,
                message: `La catégorie que vous essayez de modifier n\'existe pas !`
            });
        }

        /** Si la catégorie existe */
        const updatedCategory = fakeCategoryService.update(id, newCategoryInfos);
        res.status(200).json(updatedCategory);
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    delete: (req, res) => {
        const id = +req.params.id;

        /** Si on nous renvoie l'id, c'est ok */
        if(fakeCategoryService.delete(id)) {
            /** On renvoie '204' ==> 'noContent' */
            res.sendStatus(204);
        } else {
            /** Si ne renvoi pas l'id ==> 404 ==> tâche existe pas */
            res.status(404).json({
                StatusCode: 404,
                message: 'Suppression impossible, la tâche n\'existe pas'
            });
        }
    }
}

module.exports = categoryController;
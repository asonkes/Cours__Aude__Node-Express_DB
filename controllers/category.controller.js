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
        // TODO : Vérifier si l'id existe sinon 404
        // TODO : Vérifier que le nouveau nom n'est pas déjà présent dans la DB sinon 409
        // TODO : Faire la modification
        res.sendStatus(501);
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    delete: (req, res) => {
        
        res.sendStatus(501);
    }
}

module.exports = categoryController;
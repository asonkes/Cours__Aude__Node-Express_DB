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
                message: "Catégorie non trouvée !"
            });
        }

        res.status(200).json(category);
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    create: (req, res) => {
        res.sendStatus(501);
    }, 

    update: (req, res) => {
        res.sendStatus(501);
    },

    delete: (req, res) => {
        res.sendStatus(501);
    }
}

module.exports = categoryController;
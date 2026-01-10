/******************************************************/
/*** Ici c'est le service des catégories (categories) */
/******************************************************/
const { categories } = require('./fakeDb');

const fakeCategoryService = {

    /** On va récupérer toutes les catégories */
    find: () => {
        return categories;
    },

    /** On la tâche dont l'id correspond à l'id dans l'url */
    findById: (id) => {
        return categories.find(category => category.id === id);
    },

    /** On va ajouter une tâche */
    /** On raisonne ==> il faut ajouter un élément ==> JS = PUSH() */
    create: () => {

    }
}

module.exports = fakeCategoryService;
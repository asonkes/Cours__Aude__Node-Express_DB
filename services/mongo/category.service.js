const Category = require("../../models/category.model");

const categoryService = {
  /** On va créer notre "vrai" service cette fois-ci mais se sont les mêmes foncitonnalités que notre fakeService, donc nous aurons les mêmes fonctions */
  /** On met un 'async' partout car intérroger une DB, ca peut prendre du temps !!! */
  find: async () => {
    try {
      // On va interroger la db
      // Ici aussi await car peut prendre du temps, pour attendre la fin de l'action
      const categories = await Category.find();
      return categories;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  findById: async (id) => {
    try {
      /** await car peut prendre du temps pour télécharger */
      const searchedCategory = await Category.findById(id);
      return searchedCategory;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  create: async (category) => {},

  nameAlreadyExists: async (name) => {
    try {
      // Trouver dans la DB une catégorie qui possède le nom reçu en 'paramètre'
      // On veut juste un booléen avec 'true' ou 'false'
      // findOne attend un FILTRE
      const searchedCategory = await Category.findOne({ name });

      // Le findOne nous renvoie la catégorie qu'il a trouvé !!!
      if (searchedCategory) {
        return true;
      } else {
        // Si aucune catégorie n'a été trouvé, catégorie n'existe pas ==> renvoie FAUX
        return false;
      }
    } catch {
      console.log(err);
      throw new Error(err);
    }
  },
};

module.exports = categoryService;

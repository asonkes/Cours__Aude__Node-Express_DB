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

  findById: async (id) => {},
  create: async (category) => {},
  nameAlreadyExists: async (name) => {},
};

module.exports = categoryService;

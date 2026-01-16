/*************************************************/
/** Ici on est dans le controller des catégories */
/*************************************************/

const fakeCategoryService = require("../services/fake/fakeCategory.service");

const categoryService = require("../services/mongo/category.service");

const categoryController = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    try {
      // On appelle notre service qui va chercher dans la DB
      const categories = await categoryService.find();
      // Si ca marche, on renvoie les catégories
      res.status(200).json(categories);
    } catch (err) {
      // Si erreur de récupération dans le service, on envoie une 500
      console.log(err);
      res.status(500).json({
        StatusCode: 500,
        message: `Erreur avec la DB`,
      });
    }
  },

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  getById: async (req, res) => {
    /** Permet de transformer l'id en nombre */
    /** L'id à la base est tdéjà trouvé par 'findById() */

    /** En enlève le '+' devant car ce n'est plus un nombre  */
    /** id de notre catégorie est créé par 'mongoose' ==> 696778bfead3a0bce2baf4cb */
    /** Aller prendre un id d'une de nos catégorie !!! */
    const id = req.params.id;

    try {
      const category = await categoryService.findById(id);

      if (!category) {
        res.status(404).json({
          statusCode: 404,
          message: `La catégorie ${id} n'existe pas !`,
        });
      }

      res.status(200).json(category);
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: `Erreur de la DB`,
      });
    }
  },

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  insert: async (req, res) => {
    const categoryToAdd = req.body;

    try {
      /** Si le nom existe déjà en BD ==> erreur */
      /** Donc si renvoie 'true' */
      const exists = await categoryService.nameAlreadyExists(
        categoryToAdd.name
      );

      if (exists) {
        res.status(409).json({
          statusCode: 409,
          message: `La catégorie ${categoryToAdd.name} existe déjà !`,
        });
      } else {
        // Si elle n'existe pas, on peut la créer
        const insertedCategory = await categoryService.create(categoryToAdd);
        res.location(`/api/categories/${insertedCategory.id}`);
        res.status(201).json(insertedCategory);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  },

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  update: (req, res) => {
    const id = +req.params.id;
    const newCategoryInfos = req.body;

    if (!category) {
      res.status(404).json({
        statusCode: 404,
        message: `La catégorie que vous essayez de modifier n\'existe pas !`,
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
    if (fakeCategoryService.delete(id)) {
      /** On renvoie '204' ==> 'noContent' */
      res.sendStatus(204);
    } else {
      /** Si ne renvoi pas l'id ==> 404 ==> tâche existe pas */
      res.status(404).json({
        StatusCode: 404,
        message: "Suppression impossible, la tâche n'existe pas",
      });
    }
  },
};

module.exports = categoryController;

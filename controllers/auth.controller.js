const authService = require("../services/mongo/auth.service");

const authController = {
  register: async (req, res) => {
    try {
      // On récupère le body de la requête qui contient les infos de l'utilisateur
      const userToAdd = req.body;

      // On va vérifier si l'email n'est pas déjà utilisé
      if (await authService.emailAlreadyExists(userToAdd.email)) {
        res.status(409).json({
          status: 409,
          message: `Cet email ets déjà utilisé`,
        });
      }

      // On tente d'ajouter l'utilisateur
      const userCreated = await authService.create(userToAdd);

      res.location(`/api/user/${userCreated.id}`);
      res.status(201).json({
        id: userCreated._id,
        firstname: userCreated.firstname,
        lastname: userCreated.lastname,
      });
    } catch (err) {
      console.log(err);

      res.sendStatus(500);
    }
  },

  login: async (req, res) => {
    try {
    } catch (err) {
      res.sendStatus(500);
    }
  },
};

module.exports = authController;

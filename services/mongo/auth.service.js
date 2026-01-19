const argon2 = require("argon2");
const User = require("../../models/user.model");

const authService = {
  findByCredentials: async (credentials) => {},

  emailAlreadyExists: async (email) => {
    try {
      const userFound = await User.findOne({ email });
      // Si un utilisateur est trouvé, oui, l'email existe déjà
      if (userFound) {
        return true;
      } else {
        // sinon, on renvoie false
        return false;
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  create: async (user) => {
    try {
      // On va hasher et modifier le mot de passe de l'utilisateur pour ajouter la version hashée en db
      const hashedPassword = await argon2.hash(user.password);

      // On remplace le password de user avec la version hashée
      user.password = hashedPassword;

      // Plus qu'à sauvegarder notre user
      const userToCreate = User(user);
      await userToCreate.save();

      return userToCreate;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
};

module.exports = authService;

const User = require("../../models/user.model");

const userService = {
  find: async (query) => {
    try {
      const { firstname } = query;

      /** Vérifier si "firstname est bien présent pour créer un filtre */
      let firstnameFilter;

      if (firstname === undefined) {
        firstnameFilter = {};
      } else {
        firstnameFilter = { firstname };
      }

      const users = await User.find({
        firstname: { $regex: new RegExp("au", "i") },
      });
      return users;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
};

module.exports = userService;

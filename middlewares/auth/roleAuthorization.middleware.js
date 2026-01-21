const User = require("../../models/user.model");

// ? Middleware pour vérifier si l'utilisateur qui fait la requête
// possède au moins un des rôles autorisés reçus en paramètre

// note : le paramètre rôle, sera un tableau avec tous les rôles autorisés
const roleAuthorizationMiddleware = (roles) => {
  return async (req, res, next) => {
    // ? 1) Récupérer l'id de l'utilisateur qui fait la requête
    const userId = req.user.id;

    // ? 2) On cherche cet utilisateur dans la DB pour avoir accès à son rôle
    try {
      const userInDB = await User.findById(userId);

      // Si pas de user trouvé avec cet 'id'
      if (!userInDB) {
        res.status(404).json({
          statusCode: 404,
          message: `Vous n'\existez plus en DB, dommage`,
        });
      }
      // Si par contre, on a trouvé un user
      else {
        // ? 3)On va vérifier si son rôle fait partie des rôles autorisés
        // Si le tableau de rôles autorisés inclus le role de l'utilisateur
        // C'ets bon, il peut accéder
        if (roles.includes(userInDB.role)) {
          next();
        } else {
          res.status(403).json({
            statusCode: 403,
            message: `Vous n\'avez pas les droits d\'accès sur cette ressource`,
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: `La DB a planté`,
      });
    }
  };
};

module.exports = roleAuthorizationMiddleware;

// ? Middleware qui v apermettre de vérifier si l'id dans la route est le même que l'id rajouté
// dans la requête par notre authentification

const User = require("../../models/user.model");

const userAuthorizationMiddleware = () => {
  return async (req, res, next) => {
    // Vérifier si l'id du token stocké dans la requête est identique à l'id dans
    // la route de la requête pour voir si on a le droit d'accéder à la ressource
    // ? 1) Récupérer l'id se trouvant dans la route
    const userRouterId = req.params.id;
    console.log("userRouterId " + userRouterId);

    // ? 2) Récupérer l'id se trouvant dans le token et qui a étét ajouté dans la requête
    const userId = req.user.id;
    console.log("userId " + userId);

    // ? 3) Récupérer le rôle de l'utilisateur qui fait la requête puiqu'il est admin
    // Il a tous les droits
    // 2 options
    // Soit on le récupère dans la requête puisqu'il était dans le token.
    // Inconvénient : Si le rôle de la personne a changé entre le moment où le token a été créé et
    // maintenant, il a toujours l'ancien rôle
    // Soit on fait une requête vers la DB pour avoir son rôle à cet instant pécis (on va faire ellle)
    try {
      const tokenUser = await User.findById(userId);
      // Si on a pas récupérer d'utilisateur, c'est que la personne qui a fait la requête a été supprimée de le db entre temps
      if (!tokenUser) {
        res.status(404).json({
          statusCode: 404,
          message: `Vous n'\'existez plus, dommage !!!`,
        });
      } else {
        // Si par contre la personne existe, on va vérifier son rôle
        // S'il est admin, c'est bon, il a accès
        if (tokenUser.role === "Admin") {
          next();
        } else if (userId === userRouterId) {
          next();
        }
        // Sinon c'est qu'il n'est ni Admin, ni la personnne dont il souhaite regarder les tâches
        else {
          res.status(403).json({
            statusCode: 403,
            message: `Vous n'\'avez pas les droits d\'accéder à ces données !`,
          });
        }
      }

      User;
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: `Une erreur est survenue dans la DB`,
      });
    }
  };
};

module.exports = userAuthorizationMiddleware;

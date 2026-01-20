// Ce middleware va permettre de vérifier si un token a bien été fourni
// Si oui, on continue la requête
// Si pas de token, on arrête la requête et on met un code d'erreur
// -> Résultat : Il faut être connecté pour accéder à la ressource

const authentificationMiddleware = () => {
  /**
   * @param { Request }
   */
  return (req, res, next) => {
    // Le token reçu dans authorization doit ressembler à
    // "Bearer" Le TokenIciAvecPleinDeChiffresEtDeLettres

    // ? Récupérer le headers qui s'appelle authorization
    const authorization = req.headers.authorization;
    console.log(authorization);

    // Si le token n'a pas été ajouté dans authorization, on aura 'undefined'
    // Et dans ce cas, on met fin à la requête
    // La personne n'est pas connectée
    if (!authorization) {
      res.status(401).json({
        statusCode: 401,
        message: `Vous devez être connecté`,
      });
    }

    // ? Si quelqu'un a envoyé quelque chose dans Authorization comme "Bearer"
    // sans envoyer le token après Bearer : fin de la requête

    // authorization.split(' ') permet de découper la chaîne, là où il y a un espace
    // On obtient donc un tableau avec 2 cases
    // Dans la 1ere [0] "Bearer"
    // Dans la 2eme [1] le token
    const token = authorization.split(" ")[1];
    if (!token) {
      res.status(401).json({
        statusCode: 401,
        message: `Vous devez être connecté`,
      });
    }

    // ? S'il y a un token
    // TODO : décoder le token
    // TODO : stocker le payload récupéré dans notre objet requête
    // On continue la requête
    next();
  };
};

module.exports = authentificationMiddleware;

/******************************************/
/** Ici on est sur la partie middlewares **/
/******************************************/
const offensivesWords = ["Trump", "Elon", "Musk", "Kirk"];

const bodyValidatorMiddleware = () => {
  /**
   * @param {Request} req
   * @param {Response} res
   */
  return (req, res, next) => {
    // Si par mégarde, il y a pas de body
    const body = req.body;

    /** S'il y a pas de body */
    if (!body) {
      next();
    }

    // S'il y a un body, on va aller chercher toutes les propriétés contenues dedans
    const fields = Object.keys(req.body);

    // Pour chaque propriété du body
    for (let field of fields) {
      const valueInField = req.body[field];

      // Ici on doit vérifier aussi que la catégorie n'est pas un nombre aussi va planter
      if (typeof valueInField === "string") {
        //On va vérifier s'il y a un mot offensant dedans

        const valueInField = req.body[field];
        // si le type de la valeur contenue dans le champs est bien une chaine
        if (typeof valueInField === "string") {
          //on va vérifier s'il y a un mot offensant dedans
          if (
            offensivesWords.some((word) =>
              valueInField.toLowerCase().includes(word)
            )
          ) {
            res
              .status(400)
              .json({
                statusCode: 400,
                message: `Vous ne pouvez pas mettre n'importe quoi dans ${field}`,
              });
            // ? Je crois que si je mets un res.status().json() dans une boucle, la requête ne prend pas fin et que le programme veut finir sa boucle. Si je le force à sortir de la boucle avec un return, là ça marche
            return;
          }
        }
      }
    }

    next();
  };
};

module.exports = bodyValidatorMiddleware;

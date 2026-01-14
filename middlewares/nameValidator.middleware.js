/******************************************/
/** Ici on est sur la partie middlewares **/
/******************************************/

const { Request, Response } = require("express");

const nameValidatorMiddleware = () => {
  /**
   * @param {Request} req
   * @param {Response} res
   */
  return (req, res, next) => {
    // Les requêtes doivent posséder un body avec name dedans
    const name = req.body.name;
    const tabName = ["Trump", "Elon", "Musk", "Kirk"];

    // S'il y a pas de body
    if (!req.body) {
      next();
    }

    /** S'il y a pas de name */
    if (!name) {
      next();
    }

    const infoSearched = tabName.some(
      (element) => element.toLowerCase() === name.toLowerCase()
    );

    if (infoSearched) {
      res.status(400).json({
        StatusCode: 400,
        message: `${name} est interdit !!!`,
      });
    }

    next();
  };
};

module.exports = nameValidatorMiddleware;

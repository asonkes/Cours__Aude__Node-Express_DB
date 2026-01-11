/******************************************/
/** Ici on est sur la partie middlewares **/
/******************************************/

const { Request, Response} = require('express');

const nameValidatorMiddleware = () => {

    /**
     * @param {Request} req 
     * @param {Response} res 
    */
    return (req, res, next) => {
        // Les requêtes doivent posséder un body avec name dedans
        const name = req.body.name;
        const tabName = ["Trump", "Elon", "Musk", "Kirk"];

        if(!name) {
            res.status(400).json({
                StatusCode: 400,
                message : `Le body ne contient pas de name`
            });
        }

        const infoSearched = tabName.some(element => element.toLowerCase() === name.toLowerCase());
        console.log("Bonjour", infoSearched);

        if(infoSearched) {
            res.status(400).json({
                StatusCode : 400,
                message: `${name} est interdit !!!`
            });
        }

        next();
    }
}

module.exports = nameValidatorMiddleware;
/*****************************************/
/** Ici on est sur la patie middlewares **/
/*****************************************/
const {Request, Response} = require('express');

const logMiddleware = () => {
    
    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    return (req, res, next) => {
        /** req contient la requête entrante où on ira chercher les infos qui nous intéressent */
        /** res contient la réponse et nous permettra de stopper la requête s'il le faut */
        /** next est une fonction qu'on exécutera pour permettre à la requête de continuer */
        const method = req.method;
        const url = req.url;
        const date = new Date();

        /** On aimerait que pour chaque requête il y ai cela qui s'affiche dans la console */
        /** Donc la route de la tâche avec son id */
        /** + la date et l'heure à laquelle, elle a été créé */
        console.log(`GET ${method} ${url} ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);

        /** L'appel de la fonction next, permettra d'iindiquer que la requête continue son chemin */
        next(); 
    }
}

module.exports = logMiddleware;
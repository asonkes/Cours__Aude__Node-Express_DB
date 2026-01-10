/*********************************************/
/*** Ici c'est le service des tâches (tasks) */
/*********************************************/

const { tasks } = require('./fakeDb');

const fakeTaskService = {

    /** On récupère toutes les tâches de notre DB */
    find: () => {
        return tasks;
    },

    /** On la tâche dont l'id correspond à l'id dans l'url */
    findById: (id) => {
        /** On va trouver la tâche qui correspond à l'id de l'url */
        return tasks.find(task => task.id === id); 
    },

    /** Les tâches assignées à un utilisateur */
    /** Filter car nous permet de retrouver ttes les tâches assignées à un utilisateur */
    /** Attention filter, si pas de données ==> tableau vide sera renvoyé */
    findAssignedTo: (userName) => {
        /** On met task.to ==> voir db => 'to' */
        return tasks.filter(task => task.to === userName);
    },

    /** Les tâches qui seront données par cet utilisateur */
    /** Filter car nous permet de retrouver ttes les tâches attribuées par un utilisateur */
    /** Attention filter, si pas de données ==> tableau vide sera renvoyé */
    findGivenBy: (userName) => {
        /** On met task.to ==> voir db => 'for' */
        return tasks.filter(task => task.by === userName);
    },

    /** On va ajouter une tâche */
    /** On raisonne ==> il faut ajouter un élément ==> JS = PUSH() */
    create: () => {
        // A faire demain ==> tte seule
        // Avec la fonction aussi
        return tasks.push();
    },

    update: () => {

    }, 

    delete: () => {

    }
}

module.exports = fakeTaskService;
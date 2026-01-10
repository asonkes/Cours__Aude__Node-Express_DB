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

    /** On va ajouter une tâche */
    /** On raisonne ==> il faut ajouter un élément ==> JS = PUSH() */
    insert: () => {
        return tasks.push();
    }
}

module.exports = fakeTaskService;
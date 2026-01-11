/*********************************************/
/*** Ici c'est le service des tâches (tasks) */
/*********************************************/

const { updateStatus } = require('../../controllers/task.controller');
const { nameAlreadyExists } = require('./fakeCategory.service');
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
    create: (task) => {
        /** Je dois rajouter à la main un id */
        const idMax = Math.max(...tasks.map(task => task.id));
        const newId = idMax + 1;

        /** On rajoute un 'id' à la tâche que l'on veut ajouter */
        task.id = newId;
        /** Après on push */
        tasks.push(task);

        return task;
    },

    /************************************************************************/
    /** Fonction qui permet de savoir si le nom de la tâche existe déjà */
    /************************************************************************/
    nameAlreadyExists: (name) => {
        return tasks.some(task => task.name === name);
    },

    /** Ici cela concernait le changement de valeur à "isDone" */
    /** Pour cela, il faut l'id et le status */
    updateStatus: (id, status) => {
        /** Et on utilise 'find' pas 'filter' */
        /** Car 'id' unique, donc 1 élément à retrouver ==> penser à MEMORY */
        const taskToUpdate = tasks.find(task => task.id === id);
        /** On modifie son état */
        taskToUpdate.isDone = status;
        /** On renvoie la tâche modifiée */
        return taskToUpdate;
    },

    /** Ici pour modifier une tâche, on a besoind e son 'id' */
    /** Mais AUSSI de la 'tâche' en elle-même */
    update: (id, task) => {
        /** On va trouver la tâche dont l'id correspond à l'id que l'on aura reçu en paramètre */
        const taskToUpdate = tasks.find(task => task.id === id);

        /** On fait les modifications à la main */
        /** On modifie très rarement l'id */
        /** On modifie pas son status (puisqu'on a déjà une route pour modifier le status ==> updateStatus */
        taskToUpdate.name = task.name;
        taskToUpdate.before = task.before;
        taskToUpdate.by = task.by;
        taskToUpdate.to = task.to;
        taskToUpdate.category = task.category;

        return taskToUpdate;
    }, 

    /** Pour supprimer uune tâche, on a besoin de son 'id' */
    delete: (id) => {
        /** Chercher l'index(indice) de l'élément à supprimer */
        const index = tasks.findIndex(task => task.id === id);
        /** 
         * Pour la suppression, on renvoie pas l'élément qui vient d'être supprimé
         * Donc si le findIndex(nous renvoie '-1' ==> c'est que l'élément '6', n'existe pas)
         */
        if(index === -1) {
            return false; // Cela indique que la suppression ne s'est pas faite
        }

        // Si l'index n'est pas = à '-1', c'est qu'il existe
        tasks.splice(index, 1);
        return true; // On renvoie true pour dire que la suppression est ok !
    }
}

module.exports = fakeTaskService;
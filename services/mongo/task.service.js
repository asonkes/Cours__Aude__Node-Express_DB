const Task = require("../../models/task.model");

const taskService = {
  find: async () => {
    try {
      // Populate permet de rajouter les informations reliées à notre objet task grâce à la ref qu'on a établi dans le Schema
      const tasks = await Task.find()
        .populate({
          path: "categoryId",
          select: { id: 1, name: 1, icon: 1 },
        })
        .populate({
          path: "fromUserId",
          select: { id: 1, firstname: 1, lastname: 1 },
        })
        .populate({
          path: "toUserId",
          select: { id: 1, firstname: 1, lastname: 1 },
        });
      return tasks;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  findById: async (id) => {
    try {
      const task = await Task.findById(id)
        .populate({
          path: "categoryId",
          select: { id: 1, name: 1, icon: 1 },
        })
        .populate({
          path: "fromUserId",
          select: { id: 1, firstname: 1, lastname: 1 },
        })
        .populate({
          path: "toUserId",
          select: { id: 1, firstname: 1, lastname: 1 },
        });
      return task;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  findAssignedTo: async (userId) => {
    try {
      //Trouver toutes les tâches assignées au userId reçu en paramètre
      const tasks = await Task.find({ toUserId: userId })
        .populate({
          path: "categoryId",
          select: { id: 1, name: 1, icon: 1 },
        })
        .populate({
          path: "fromUserId",
          select: { id: 1, firstname: 1, lastname: 1 },
        })
        .populate({
          path: "toUserId",
          select: { id: 1, firstname: 1, lastname: 1 },
        });
      return tasks;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  findGivenBy: async (userId) => {
    try {
      //Trouver toutes les tâches données par le userId reçu en paramètre
      const tasks = await Task.find({ fromUserId: userId })
        .populate({
          path: "categoryId",
          select: { id: 1, name: 1, icon: 1 },
        })
        .populate({
          path: "fromUserId",
          select: { id: 1, firstname: 1, lastname: 1 },
        })
        .populate({
          path: "toUserId",
          select: { id: 1, firstname: 1, lastname: 1 },
        });
      return tasks;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  create: async (task) => {
    try {
      // Créer un nouvel objet à partir du model
      const taskToAdd = Task(task);

      // Sauvegarde cet objet en DB
      await taskToAdd.save();

      // Renvoyer l'objet créé
      return taskToAdd;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  updateStatus: async (id, status) => {},

  update: async (id, task) => {},

  delete: async (id) => {
    try {
      // ? 2 solutions :
      // #region deleteOne({ })
      // avec filtre qui renvoie un objet avec une propriété deleteCount dans laquelle il y a le nombre d'éléments supprimés (si c'est 0, c'est qu'aucun élément n'a été trouvé)
      // const deleteInfo =  await Task.deleteOne( { _id : id });

      // if(deleteInfo.deletedCount === 0) {
      //     return false;
      // }
      // else {
      //     return true;
      // }
      // return deleteInfo.deletedCount !== 0;
      //#endregion

      //#region findByIdAndDelete(id)
      // Va d'abord faire la méthode findById pour trouver l'élément et ensuite va supprimer. Cette méthode vous renvoir alors l'élément (ou pas) qui va être supprimé
      const deletedTask = await Task.findByIdAndDelete(id);
      if (deletedTask) {
        return true;
      } else {
        return false;
      }
      //#endregion
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
};

module.exports = taskService;

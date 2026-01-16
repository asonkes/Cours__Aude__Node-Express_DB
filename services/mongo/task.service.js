const { findById } = require("../../models/category.model");
const Task = require("../../models/task.model");

const taskService = {
  find: async () => {
    try {
      const tasks = await Task.find();
      return tasks;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
  findById: async (id) => {
    try {
      const searchedTask = await Task.findById(id);
      return searchedTask;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  /** Les tâches assignées à un utilisateur */
  findAssignedTo: async (userId) => {
    try {
      const tasks = await Task.find();
      /** On met task.to ==> voir db => 'fromUserId' */
      tasks.filter((task) => task.fromUserId === userId);
      return tasks;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  /** Les tâches qui seront données par cet utilisateur */
  findGivenBy: async (userId) => {
    const tasks = await Task.find();
    /** On met task.to ==> voir db => 'toUserId' */
    tasks.filter((task) => task.toUserId === userId);
    return tasks;
  },

  /** Ici pour créer des tâches */
  create: async (task) => {
    try {
      const taskToAdd = Task(task);

      await taskToAdd.save();
      return taskToAdd;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  delete: async (id) => {
    try {
      const taskToDeleted = await Task.findByIdAndDelete(id); // retourne {deletedCount: 1}
      return taskToDeleted;
    } catch (err) {
      await Character.deleteOne({ name: "Eddard Stark" });
      console.log(err);
      throw new Error(err);
    }
  },
};

module.exports = taskService;

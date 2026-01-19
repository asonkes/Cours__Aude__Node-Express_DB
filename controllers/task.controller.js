/*****************************************/
/** On est dans le controller des tâches */
/*****************************************/
const { Request, Response } = require("express");
const fakeTaskService = require("../services/fake/fakeTask.service");
const taskService = require("../services/mongo/task.service");

const taskController = {
  /**
   * Permet de récupérer toutes les tâches
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    try {
      // On appelle notre service qui va chercher dans la DB
      const tasks = await taskService.find();
      res.status(200).json(tasks);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: `Erreur de la DB`,
      });
    }
  },

  /**
   * Récupérer une tâche avec un id spécifique
   * @param {Request} req
   * @param {Response} res
   */
  getById: async (req, res) => {
    const id = req.params.id;
    try {
      const task = await taskService.findById(id);

      if (!task) {
        res.status(404).json({
          statusCode: 404,
          message: `La catégorie ${id} n'existe pas`,
        });
      }

      res.status(200).json(task);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: `Erreur dans le DB`,
      });
    }
  },

  /**
   * Récupérer les tâches d'un user
   * @param {Request} req
   * @param {Response} res
   */
  getByUser: async (req, res) => {
    try {
      const userId = req.params.id;
      // TODO idéalement, il faudrait utiliser un UserService pour vérifier si l'utilisateur existe vraiment en DB
      const tasksToDo = await taskService.findAssignedTo(userId);

      // Ici les tâches que le 'userId' aura donné à quelqu'un
      const tasksGiven = await taskService.findGivenBy(userId);

      const dataToSend = {
        tasksToDo,
        tasksGiven,
      };

      /** On fait ça sous forme d'objet, car on peut pas faire :
       * res.status(200).json()
       */
      res.status(200).json(dataToSend);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: `Erreur dans la DB`,
      });
    }
  },

  /**
   * Ici on va ajouter une tâche
   * @param {Request} req
   * @param {Response} res
   */
  insert: async (req, res) => {
    const taskToAdd = req.body;

    try {
      /** Si la tâche n'existe pas, on peut faire l'insertion */
      const insertedTask = await taskService.create(taskToAdd);
      res.location(`/api/tasks/${insertedTask.id}`);
      res.status(201).json(insertedTask);
    } catch {
      res.status(500).json({
        statusCode: 500,
        message: `Il y a une erreur avec la DB`,
      });
    }
  },

  /**
   * Ici, on va modifier le status d'une des données de la tâche(ici ==> 'isDone')
   * @param {Request} req
   * @param {Response} res
   */
  updateStatus: (req, res) => {
    /** On transforme l'id en nombre */
    const id = +req.params.id;
    /** Et on va chercher le nouveau statut renseigné par l'utilisateur */
    const newStatus = req.body.isDone;

    /** On va d'abord vérifier si elle existe */
    /** On peut reprendre dans le service 'findById' car si l'id n'existe pas, on arrete */
    const task = fakeTaskService.findById(id);
    if (!task) {
      res.status(404).json({
        StatusCode: 404,
        message: `La tâche que vous essayez de modifier n\'existe pas !`,
      });
    }

    /** Si la tâche existe, on peut la modifier */
    const updateTask = fakeTaskService.updateStatus(id, newStatus);
    res.status(200).json(updateTask);
  },

  /**
   * Ici on va modifier une tâche (plusieurs éléments à l'intérieur)
   * @param {Request} req
   * @param {Response} res
   */
  update: (req, res) => {
    const id = +req.params.id;
    const newTaskInfos = req.body;

    const task = fakeTaskService.findById(id);

    if (!task) {
      res.status(404).json({
        StatusCode: 404,
        message: `La tâche que vous essayez de modifier n\'existe pas !`,
      });
    }

    /** Si la tâche existe */
    const updatedTask = fakeTaskService.update(id, newTaskInfos);
    res.status(200).json(updatedTask);
  },

  /**
   * Ici on va supprimer une tâche
   * @param {Request} req
   * @param {Response} res
   */
  delete: async (req, res) => {
    try {
      const taskToDeleted = await taskService.delete(id);

      if (!taskToDeleted) {
        res.status(404).json({
          statusCode: 404,
          message: `Suppression impossible, la tâche n'existe pas !`,
        });
      } else {
        res.status(204);
      }
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: `Erreur de la DB`,
      });
    }
  },
};

module.exports = taskController;

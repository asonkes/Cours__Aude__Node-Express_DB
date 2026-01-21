const { Request, Response } = require("express");
const userService = require("../services/mongo/user.service");
const { getById } = require("./task.controller");

const userController = {
  /**
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    try {
      const users = await userService.find();

      const dataSend = {
        count: users.length,
        users,
      };

      res.status(200).json(dataSend);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: `Erreur de la DB`,
      });
    }
  },
};

module.exports = userController;

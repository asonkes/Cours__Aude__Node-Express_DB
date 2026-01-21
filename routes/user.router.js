const userController = require("../controllers/user.controller");

const userRouter = require("express").Router();

userRouter.route("/").get(userController.getAll);

module.exports = userRouter;

const userController = require("../controllers/user.controller");
const authentificationMiddleware = require("../middlewares/auth/authentification.middleware");

const userRouter = require("express").Router();

userRouter.route("/").get(authentificationMiddleware(), userController.getAll);

module.exports = userRouter;

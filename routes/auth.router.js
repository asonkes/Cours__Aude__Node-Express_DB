const authRouter = require("express").Router();

authRouter.post("/register", (req, res) => {
  res.sendStatus(501);
});

authRouter.post("/login", (req, res) => {
  res.sendStatus(501);
});

module.exports = authRouter;

const express = require("express");
const userRouter = express.Router();

// const bodyParser = require("body-parser");
// const path = require("path");
// const userPath = path.join(__dirname, "../../../../front-end/src/views/user");

// router.use(bodyParser.json());
// router.use(express.static(userPath));

let users = [
  { id: 1, name: "a" },
  { id: 2, name: "b" },
  { id: 3, name: "c" },
];
userRouter.get("/", (req, res) => {
  return res.json(users);
});

module.exports = userRouter;

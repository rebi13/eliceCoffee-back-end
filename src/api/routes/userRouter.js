const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const path = require("path");
const userPath = path.join(__dirname, "../../../../front-end/src/views/user");

router.use(bodyParser.json());
router.use(express.static(userPath));

router.get("/", (req, res) => {
  res.sendFile(userPath + "/login.html");
});

router.get("/login", (req, res) => {
    res.sendFile(userPath + "/login.html");
});

module.exports = router;

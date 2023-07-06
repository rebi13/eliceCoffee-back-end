const { Router } = require("express");
const { userService } = require("../services");
const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const { id, pw } = req.body;
    const userToken = await userService.getUserToken({ id, pw });
    res.cookie("login token", userToken);
    res.send({ isLogin: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

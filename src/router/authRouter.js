const { Router } = require("express");
const { userService } = require("../services");
const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const id = req.body.id;
    const pw = req.body.pw;
    const userToken = await userService.getUserToken({ id, pw });
    //res.cookie("login token", userToken);
    res.send({ isLogin: true, userToken });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

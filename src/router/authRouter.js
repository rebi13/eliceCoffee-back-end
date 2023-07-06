const { Router } = require("express");
const { userService } = require("../services");
const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const id = req.body.id;
    const pw = req.body.pw;
    const userToken = await userService.getUserToken({ id, pw });
    res.cookie("loginToken", userToken).send({ isLogin: true });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  const { id, pw, name, email, phone } = req.body;
  const newUser = await userService.addUser({
    id,
    pw,
    name,
    email,
    phone,
  });
  res.json(newUser);
});

router.post("/checkDupId", async (req, res, next) => {
  const { id } = req.body;
  const isDuplicate = await userService.duplicateTest(id);
  res.json(isDuplicate);
});

router.put("/logout", async (req, res, next) => {
  return res.clearCookie("loginToken").end();
});

module.exports = router;

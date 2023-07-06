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

router.post("/register", async (req, res, next) => {
  // const { id, pw, name, email, phone, address, profile } = req.body;
  // const newUser = await userService.addUser({
  //   id,
  //   pw,
  //   name,
  //   email,
  //   phone,
  //   address,
  //   profile,
  // });
  // res.json(newUser);
  const id = "myId";
  const pw = "myPw";
  const name = "myName";
  const email = "myEmail";
  const phone = "myPhone";
  const address = "myAddress";
  const newUser = await userService.addUser({
    id,
    pw,
    name,
    email,
    phone,
    address,
  });
  res.json(newUser);
});

module.exports = router;

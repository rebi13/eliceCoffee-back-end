const { Router } = require("express");
const { userService } = require("../services");
const transPorter = require("../config/email");
const router = Router();
const jwt = require("jsonwebtoken");

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
  try {
    const { id, pw, name, email, phone } = req.body;
    const newUser = await userService.addUser({
      id,
      pw,
      name,
      email,
      phone,
    });
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/checkDupId", async (req, res, next) => {
  try {
    const { id } = req.body;
    const isDuplicate = await userService.duplicateTest(id);
    res.json(isDuplicate);
  } catch (err) {
    next(err);
  }
});

router.put("/logout", async (req, res, next) => {
  return res.clearCookie("loginToken").end();
});

router.post("/search-id", async (req, res, next) => {
  try {
    const { email } = req.body;
    const userId = await userService.findingId(email);
    res.json(userId);
  } catch (err) {
    next(err);
  }
});

router.patch("/reset-pw", async (req, res, next) => {
  const { id, email } = req.body;
  const resetPw = await userService.resetPW({ id, email });
  const mailOptions = {
    from: "kimsungjin927@gmail.com",
    to: email,
    subject: "[eliceCoffee] 비밀번호 초기화",
    text: "초기화된 비밀번호입니다. " + resetPw,
  };
  await transPorter.sendMail(mailOptions, (err, info) => {
    console.log(mailOptions);
    if (err) {
      console.log(err);
    }
    res.send(resetPw);
    sendEmail.close();
  });
});

router.put("/me", async (req, res, next) => {
  try {
    const { address, pw } = req.body;
    const userToken = req.cookies.loginToken.token;
    const editUser = await userService.editUser(
      {
        address,
        pw,
      },
      userToken
    );
    res.json(editUser);
  } catch (err) {
    next(err);
  }
});

router.put("/withdrawal", async (req, res, next) => {
  try {
    const userToken = req.cookies.loginToken.token;
    const deleteUser = await userService.deleteUser(userToken);
    res.json(deleteUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

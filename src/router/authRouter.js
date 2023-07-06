const { Router } = require("express");
const router = Router();

userRouter.post("/login", async (req, res, next) => {
  try {
    const { id, pw } = req.body;
    const uesrToken = await userServise.getUserToken({ id, pw });
  } catch (err) {
    next(err);
  }
});

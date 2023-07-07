const express = require("express");
const viewRouter = require("./viewsRouter");
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const adminRouter = require("./adminRouter");
// 버전1 라우터

const v1Router = express.Router();

v1Router.use(viewRouter);
v1Router.use("/users", userRouter);
v1Router.use("/auth", authRouter);
v1Router.use("/admin", adminRouter);

module.exports = {
  v1: v1Router, // API 버저닝
};

const express = require("express");
const viewRouter = require("./viewsRouter");
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const adminRouter = require("./adminRouter");
const productRouter = require("./productRouter");
const orderRouter = require("./orderRouter");

// 버전1 라우터
const v1Router = express.Router();

v1Router.use(viewRouter);
v1Router.use("/users", userRouter);
v1Router.use("/auth", authRouter);
v1Router.use("/admin", adminRouter);
v1Router.use("/products", productRouter);
v1Router.use("/orders", orderRouter);

module.exports = {
  v1: v1Router, // API 버저닝
};

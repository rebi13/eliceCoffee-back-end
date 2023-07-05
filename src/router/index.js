const express = require("express");
const userRouter = require("./userRouter");

// 버전1 라우터

const v1Router = express.Router();

v1Router.use("/users", userRouter);

module.exports = {
    v1: v1Router, // API 버저닝
}
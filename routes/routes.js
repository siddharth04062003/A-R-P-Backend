const express = require("express");
const userRouter = require("./userRoutes");
const adminRouter = require("./adminRoutes");

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/admin", adminRouter);

module.exports = rootRouter;

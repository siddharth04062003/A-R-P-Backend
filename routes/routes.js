const express = require("express");

import userRouter from './user';

const rootRouter = express.Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/admin', adminRouter);
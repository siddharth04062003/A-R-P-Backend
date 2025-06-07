const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const LoginCheck = require("../middleware/LoginCheck");
const AuthCheck = require("../middleware/AuthCheck");
const SignUpCheck = require("../middleware/SignUpCheck");
const updateZod = require("../ZodValidators/updateZod");


const userRouter = express.Router();




userRouter.post("/signup", SignUpCheck, async (req, res) => {
  try {
    const { name, email, uid, semester, password } = req.parsedBody;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      uid,
      semester,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


userRouter.post("/signin", LoginCheck, (req, res) => {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
  const token = jwt.sign({ userID: req.parsedBody.userID }, process.env.JWT_SECRET);
  return res.status(200).json({ token });
});

userRouter.put("/", AuthCheck, async (req, res) => {
  const parsedBody = updateZod.safeParse(req.body);
  try {
    if (!parsedBody.success) {
      return res.status(400).json({ message: "Validation failed" });
    }
    const newHashPassword = await bcrypt.hash(parsedBody.data.password, 10);
    parsedBody.data.password = newHashPassword;
    await User.updateOne({ _id: req.userID }, { ...parsedBody.data });
    return res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = userRouter;


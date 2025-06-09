const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const LoginCheck = require("../middleware/LoginCheck");
const { AuthCheck } = require("../middleware/AuthCheck");
const SignUpCheck = require("../middleware/SignUpCheck");
const updateZod = require("../ZodValidators/SignUpZod");

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

userRouter.post("/signin", LoginCheck, async (req, res) => {
  try {
    const { email, password } = req.parsedBody;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({ token, message: "Signed in successfully" });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.put("/", AuthCheck, async (req, res) => {
  try {
    const parsedBody = updateZod.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ message: "Validation failed" });
    }
    if (parsedBody.data.password) {
      const newHashPassword = await bcrypt.hash(parsedBody.data.password, 10);
      parsedBody.data.password = newHashPassword;
    }
    await User.updateOne({ _id: req.userID }, { ...parsedBody.data });
    return res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = userRouter;

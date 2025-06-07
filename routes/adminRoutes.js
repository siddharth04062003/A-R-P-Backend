const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const LoginCheck = require("../middleware/LoginCheck");
const AuthCheck = require("../middleware/AuthCheck");
const updateZod = require("../ZodValidators/updateZod");

const adminRouter = express.Router();

adminRouter.post("/signin", LoginCheck, (req, res) => {
  const token = jwt.sign({ userID: req.parsedBody.userID }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
  return res.status(200).json({ token });
});

adminRouter.put("/", AuthCheck, async (req, res) => {
  const parsedBody = updateZod.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({ message: "Validation failed", error: parsedBody.error });
  }

  try {
    const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);
    await User.updateOne(
      { _id: req.userID },
      { ...parsedBody.data, password: hashedPassword }
    );

    return res.status(200).json({ message: "Admin profile updated successfully" });
  } catch (err) {
    console.error("Admin Update Error:", err.message);
    return res.status(500).json({ message: "Failed to update admin" });
  }
});

module.exports = adminRouter;

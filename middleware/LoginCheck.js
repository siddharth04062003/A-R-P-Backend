const User = require('../models/User');
const bcrypt = require('bcryptjs');
const SignInZod = require('../ZodValidators/SignInZod');

const LoginCheck = async (req, res, next) => {
  console.log("➡️ Incoming Body:", req.body);

  const parsedResult = SignInZod.safeParse(req.body);

  if (!parsedResult.success) {
    console.log("❌ Zod Error:", parsedResult.error.format());
    return res.status(400).json({ message: "Invalid input format", error: parsedResult.error.format() });
  }

  req.parsedBody = parsedResult.data;

  const { email, password } = parsedResult.data;

  try {
    console.log('!!!!!!!User model:', User);
    console.log('!!!!!!!User.findOne:', User.findOne);

    const userFetched = await User.findOne({ email: email }); // find by email field
    if (!userFetched) return res.status(401).json({ message: "User not found" });

    const isPassValid = await bcrypt.compare(password, userFetched.password);
    if (!isPassValid) return res.status(401).json({ message: "Incorrect password" });

    req.parsedBody = { ...req.parsedBody, userID: userFetched._id };
    next();
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = LoginCheck;

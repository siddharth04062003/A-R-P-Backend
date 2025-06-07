const User = require("../models/User");
const SignUpZod = require("../ZodValidators/updateZod");

const SignUpCheck = async (req, res, next) => {
  console.log("Signup payload received:", req.body); // Debug backend input

  const parsedResult = SignUpZod.safeParse(req.body);

  if (!parsedResult.success) {
    console.log("Zod validation errors:", parsedResult.error.format()); // Debug errors
    return res.status(400).json({ message: "Invalid signup data", error: parsedResult.error.format() });
  }

  const { email } = parsedResult.data;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    req.parsedBody = parsedResult.data;
    next();
  } catch (err) {
    console.error("Signup middleware error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = SignUpCheck;

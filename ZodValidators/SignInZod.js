// ZodValidators/SignInZod.js
const { z } = require("zod");

const SignInZod = z.object({
  email: z.string().email(), // validate proper email format
  password: z.string().min(1),
});

module.exports = SignInZod;

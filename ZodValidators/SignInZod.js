// ZodValidators/SignInZod.js
const  z  = require("zod");
function emailValidation(domain){
  return z.string()
          .trim()
          .toLowerCase()
          .email()
          .min(9,'Email cannot be empty')
          .max(254)
}
const SignInZod = z.object({
  email: emailValidation(), // validate proper email format
  password: z.string().min(1),
});

module.exports = SignInZod;

const { z } = require("zod");

const SignUpZod = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  uid: z.string().min(1),
  semester: z.string().min(1),
  password: z.string().min(6),
});

module.exports = SignUpZod;

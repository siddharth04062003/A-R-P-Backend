const { z } = require("zod");

function emailValidation(domain){
  return z.string()
          .trim()
          .toLowerCase()
          .email()
          .min(9,'Email cannot be empty')
          .max(254)
          .refine(
            mail=>mail.endsWith(domain),
            {message:`Must end with ${domain}`}
          )
}

function uidValidation(){
  return z.string()
          .trim()
          .toLowerCase()
          .refine(
            id=>id.includes('bcs')
          )
}

const SignUpZod = z.object({
  name: z.string().min(1),
  email: emailValidation('@cuchd.in'),
  uid: uidValidation(),
  semester: z.string().min(1),
  password: z.string().min(6),
});

module.exports = SignUpZod;

 
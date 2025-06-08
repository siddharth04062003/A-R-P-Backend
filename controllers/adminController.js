const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

    const actualEmail = process.env.FIXED_EMAIL;
    const actualPass = process.env.FIXED_PASSWORD;
  if (email !== actualEmail || password !== actualPass) {
    return res.status(401).json({ message: "Invalid admin credentials" });
    console.log("Auth Failed !")
  }

  const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  console.log('Token Generated !')

  return res.status(200).json({ token, message: "Admin logged in successfully" });
};

module.exports = {
  adminLogin,
};

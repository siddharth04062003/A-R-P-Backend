// middleware/AuthCheck.js
const jwt = require('jsonwebtoken');

const AuthCheck = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded.userID;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};

module.exports =AuthCheck;

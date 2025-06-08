const jwt = require("jsonwebtoken");

const AuthCheck = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) return res.status(401).json({ message: "No token provided" });

  try {
    const token = bearerToken.split(" ")[1]; // ✅ Extract actual token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userID = decoded.userID || null;
    req.email = decoded.email || null;
    req.role = decoded.role || "student";

    next();
  } catch (err) {
    console.log("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};


// Additional middleware for admin-only access
const AdminCheck = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

module.exports = {
  AuthCheck,
  AdminCheck,
};

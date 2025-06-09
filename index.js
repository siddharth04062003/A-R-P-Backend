const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoutes");
const resourceRoutes = require("./routes/resourceRoutes");

const generalLimiter = require("./middleware/RateLimiter"); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Apply rate limiter to all routes
app.use(generalLimiter);

// Routes
app.get("/", (req, res) => {
  res.send("Academic Resource Site API");
});
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/resources", resourceRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

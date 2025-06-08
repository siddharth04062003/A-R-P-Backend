const express = require("express");
const { AuthCheck, AdminCheck } = require("../middleware/AuthCheck");
const { adminLogin } = require("../controllers/adminController");
const { addResource, updateResource, deleteResource } = require("../controllers/resourceController");

const router = express.Router();

// Admin login
router.post("/login", adminLogin);

// Admin-only resource management
router.post("/add-resource", AuthCheck, addResource);
router.put("/update-resource/:id", AuthCheck, AdminCheck, updateResource);
router.delete("/delete-resource/:id", AuthCheck, AdminCheck, deleteResource);

module.exports = router;

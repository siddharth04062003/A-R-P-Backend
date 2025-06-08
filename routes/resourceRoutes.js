const express = require("express");
const router = express.Router();
const { getResourcesBySemester } = require("../controllers/resourceController");

// Public: get resources by semester, subject, type
router.get("/:sem", getResourcesBySemester);

module.exports = router;

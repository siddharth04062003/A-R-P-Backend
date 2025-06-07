const express = require("express");
const router = express.Router();

const {
  uploadResource,
  getResourcesBySemester,
} = require("../controllers/resourceController");

router.post("/upload", uploadResource);

router.get("/:sem", getResourcesBySemester);

module.exports = router;
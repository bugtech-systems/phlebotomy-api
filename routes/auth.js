const express = require("express");
const router = express.Router();
const { generateToken } = require("../middlewares/auth");
// Routes
router.get("/:id", generateToken);

module.exports = router;

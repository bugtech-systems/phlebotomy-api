const express = require("express");
const router = express.Router();
const { generateToken } = require("../middlewares/auth");
const { createRealmUser } = require("../controllers/auth");

// Routes
router.get("/:id", generateToken);
router.post('/', createRealmUser)
module.exports = router;

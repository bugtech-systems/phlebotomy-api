const express = require("express");
const router = express.Router();
const phlebotomistController = require("../controllers/phlebotomistController");
const uploadFile = require("../middlewares/upload.js");

// Routes
router.get("/", phlebotomistController.getAll);
router.get("/:id", phlebotomistController.getById);
router.post("/", phlebotomistController.create);
router.put("/:id", phlebotomistController.update);
router.delete("/:id", phlebotomistController.delete);
router.post("/csv", uploadFile.single("file"), phlebotomistController.upload);

module.exports = router;

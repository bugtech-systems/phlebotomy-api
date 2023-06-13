const express = require("express");
const router = express.Router();
const ridController = require("../controllers/ridController");
const uploadFile = require("../middlewares/upload.js");
const { protect } = require("../middlewares/auth");

// Routes
router.get("/", protect, ridController.getAll);
router.get("/:id", protect, ridController.getById);
router.get("/rid/:id", protect, ridController.getByRid);
router.post("/", protect, ridController.create);
router.post("/bulk", protect, ridController.bulkCreate);
router.put("/:id", protect, ridController.update);
router.put("/rid/:id", protect, ridController.updateByRid);
router.delete("/bulk", protect, ridController.bulkDelete);
router.delete("/:id", protect, ridController.delete);
router.post("/csv", uploadFile.single("file"), ridController.upload);

module.exports = router;

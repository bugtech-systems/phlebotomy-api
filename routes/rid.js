const express = require("express");
const router = express.Router();
const ridController = require("../controllers/ridController");
const uploadFile = require("../middlewares/upload.js");
// Routes
router.get("/", ridController.getAll);
router.get("/:id", ridController.getById);
router.get("/rid/:id", ridController.getByRid);
router.post("/", ridController.create);
router.post("/bulk", ridController.bulkCreate);
router.put("/:id", ridController.update);
router.put("/rid/:id", ridController.updateByRid);
router.delete("/bulk", ridController.bulkDelete);
router.delete("/:id", ridController.delete);
router.post("/csv", uploadFile.single("file"), ridController.upload);

module.exports = router;

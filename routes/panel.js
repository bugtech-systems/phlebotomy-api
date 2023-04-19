const express = require('express');
const router = express.Router();
const panelController = require('../controllers/panelController');
const uploadFile =  require('../middlewares/upload.js');

// Routes
router.get('/', panelController.getAll);
router.get('/:id', panelController.getById);
router.post('/', panelController.create);
router.put('/:id', panelController.update);
router.delete('/:id', panelController.delete);
router.post('/csv', uploadFile.single('file'), panelController.upload);

module.exports = router;
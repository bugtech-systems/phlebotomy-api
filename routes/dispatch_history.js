const express = require('express');
const router = express.Router();
const dispatchHistoryController = require('../controllers/dispatchHistoryController');
const uploadFile =  require('../middlewares/upload.js');

// Routes
router.get('/', dispatchHistoryController.getAll);
router.get('/:id', dispatchHistoryController.getById);
router.post('/', dispatchHistoryController.create);
router.put('/:id', dispatchHistoryController.update);
router.delete('/:id', dispatchHistoryController.delete);
router.post('/csv', uploadFile.single('file'), dispatchHistoryController.upload);


module.exports = router;
const express = require('express');
const router = express.Router();
const dispatchHistoryController = require('../controllers/dispatchHistoryController');

// Routes
router.get('/', dispatchHistoryController.getAll);
router.get('/:id', dispatchHistoryController.getById);
router.post('/', dispatchHistoryController.create);
router.put('/:id', dispatchHistoryController.update);
router.delete('/:id', dispatchHistoryController.delete);

module.exports = router;
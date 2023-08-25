const express = require('express');
const router = express.Router();
const checkListController = require('../controllers/checkListController');

// Routes
router.get('/', checkListController.getAll);
router.get('/:id', checkListController.getById);
router.post('/', checkListController.create);
router.put('/:id', checkListController.update);
router.delete('/:id', checkListController.delete);

module.exports = router;
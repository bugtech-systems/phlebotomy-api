const express = require('express');
const router = express.Router();
const requisitionController = require('../controllers/requisitionController');

// Routes
router.get('/', requisitionController.getAll);
router.get('/:id', requisitionController.getById);
router.post('/', requisitionController.create);
router.put('/:id', requisitionController.update);
router.delete('/:id', requisitionController.delete);

module.exports = router;
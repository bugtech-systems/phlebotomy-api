const express = require('express');
const router = express.Router();
const sampleController = require('../controllers/sampleController');

// Routes
router.get('/', sampleController.getAll);
router.get('/:id', sampleController.getById);
router.post('/', sampleController.create);
router.put('/:id', sampleController.update);
router.delete('/:id', sampleController.delete);

module.exports = router;
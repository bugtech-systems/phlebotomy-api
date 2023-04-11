const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Routes
router.get('/', patientController.getAll);
router.get('/:id', patientController.getById);
router.post('/', patientController.create);
router.put('/:id', patientController.update);
router.delete('/:id', patientController.delete);

module.exports = router;
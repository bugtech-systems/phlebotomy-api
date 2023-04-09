const express = require('express');
const router = express.Router();
const phlebotomyScheduleController = require('../controllers/phlebotomyScheduleController');

// Define routes for phlebotomy schedule
router.get('/', phlebotomyScheduleController.getAll);
router.get('/:id', phlebotomyScheduleController.getById);
router.post('/', phlebotomyScheduleController.create);
router.put('/:id', phlebotomyScheduleController.update);
router.delete('/:id', phlebotomyScheduleController.delete);

module.exports = router;
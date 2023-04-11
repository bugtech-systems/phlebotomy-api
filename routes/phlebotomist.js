const express = require('express');
const router = express.Router();
const phlebotomistController = require('../controllers/phlebotomistController');

// Routes
router.get('/', phlebotomistController.getAll);
router.get('/:id', phlebotomistController.getById);
router.post('/', phlebotomistController.create);
router.put('/:id', phlebotomistController.update);
router.delete('/:id', phlebotomistController.delete);

module.exports = router;
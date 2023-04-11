const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// GET all teams
router.get('/', teamController.getAll);

// GET a specific team
router.get('/:id', teamController.getById);

// CREATE a new team
router.post('/', teamController.create);

// UPDATE an existing team
router.put('/:id', teamController.update);

// DELETE a team
router.delete('/:id', teamController.delete);

module.exports = router;
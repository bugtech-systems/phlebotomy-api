const express = require('express');
const router = express.Router();
const uploadFile =  require('../middlewares/upload.js');
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


//Upload CSV
router.post('/csv', uploadFile.single('file'), teamController.upload);



module.exports = router;
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const uploadFile =  require('../middlewares/upload.js');

// Routes
router.get('/', clientController.getAll);
router.get('/:id', clientController.getById);
router.post('/', clientController.create);
router.put('/:id', clientController.update);
router.delete('/:id', clientController.delete);

router.post('/csv', uploadFile.single('file'), clientController.upload);


module.exports = router;
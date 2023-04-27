const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
const uploadFile =  require('../middlewares/upload.js');

 
// Routes
router.get('/', itemsController.getAll);
router.get('/:id', itemsController.getById);
router.post('/', itemsController.create);
router.put('/:id', itemsController.update);
router.delete('/:id', itemsController.delete);
router.post('/csv', uploadFile.single('file'), itemsController.upload);



module.exports = router;
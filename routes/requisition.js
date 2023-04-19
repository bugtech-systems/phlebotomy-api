const express = require('express');
const router = express.Router();
const requisitionController = require('../controllers/requisitionController');
const uploadFile =  require('../middlewares/upload.js');


// Routes
router.get('/', requisitionController.getAll);
router.get('/:id', requisitionController.getById);
router.post('/', requisitionController.create);
router.put('/:id', requisitionController.update);
router.delete('/:id', requisitionController.delete);
router.post('/csv', uploadFile.single('file'), requisitionController.upload);



module.exports = router;
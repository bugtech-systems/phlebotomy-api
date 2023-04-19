const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const uploadFile =  require('../middlewares/upload.js');


// Routes
router.get('/', patientController.getAll);
router.get('/:id', patientController.getById);
router.post('/', patientController.create);
router.put('/:id', patientController.update);
router.delete('/:id', patientController.delete);
router.post('/csv', uploadFile.single('file'), patientController.upload);



module.exports = router;
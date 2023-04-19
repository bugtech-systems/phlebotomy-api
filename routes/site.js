const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const uploadFile =  require('../middlewares/upload.js');

// GET all sites
router.get('/', siteController.getAll);

// GET a specific site
router.get('/:id', siteController.getById);

// CREATE a new site
router.post('/', siteController.create);

// UPDATE an existing site
router.put('/:id', siteController.update);

// DELETE a site
router.delete('/:id', siteController.delete);


router.post('/csv', uploadFile.single('file'), siteController.upload);



module.exports = router;
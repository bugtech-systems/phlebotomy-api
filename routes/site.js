const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');

// Define routes for site
router.get('/', siteController.getAll);
router.get('/:id', siteController.getById);
router.post('/', siteController.create);
router.put('/:id', siteController.update);
router.delete('/:id', siteController.delete);

module.exports = router;
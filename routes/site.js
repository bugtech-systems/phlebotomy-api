const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');

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

module.exports = router;
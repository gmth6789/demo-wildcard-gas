// routes/dashboard.js

const express = require('express');
const router = express.Router();

const siteController = require('../controllers/site');

router.post('/sites', siteController.createSite);

// Route for getting all sites
router.get('/sites', siteController.getAllSites);

// Route for getting a site by ID
router.get('/sites/:id', siteController.getSiteById);

// Route for updating a site by ID
router.put('/sites/:id', siteController.updateSite);

// Route for deleting a site by ID
router.delete('/sites/:id', siteController.deleteSite);


router.get('/', (req, res) => {
    res.render('dashboard.njk', { title: 'Dashboard' });
});


router.get('/settings', (req, res) => {
    res.render('settings.njk', { title: 'Settings' });
});

module.exports = router;

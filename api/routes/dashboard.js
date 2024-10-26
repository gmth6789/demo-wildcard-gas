// routes/dashboard.js

const express = require('express');
const router = express.Router();

// Example route for the dashboard
router.get('/', (req, res) => {
    res.render('dashboard.njk', { title: 'Dashboard' });
});

// Add more dashboard-related routes as needed
router.get('/settings', (req, res) => {
    res.render('settings.njk', { title: 'Settings' });
});

module.exports = router;

const router = require('express').Router();

// Now accessible at /api/fighters/test
router.get('/test', (req, res) => {
    res.json({ 
        message: 'Fighter routes working!',
        timestamp: new Date(),
        endpoint: '/api/fighters/test'
    });
});

module.exports = router;

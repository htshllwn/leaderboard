// Initialize express router
const router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 200,
        message: 'Endpoint for all APIs',
    });
});

// Export API routes
module.exports = router;

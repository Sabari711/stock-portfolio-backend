const express = require('express');
const dashboardController = require('../controllers/dashboardController')
const router = express.Router();

router.get('/quotes',dashboardController.getStockQuotes)

module.exports = router;
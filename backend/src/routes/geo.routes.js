const express = require('express');
const geoController = require('../controllers/geo.controller');

const router = express.Router();

router.get('/distance', geoController.getNearbyProviders);


module.exports = router;
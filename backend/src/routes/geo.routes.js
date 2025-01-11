const express = require('express');
const geoController = require('../controllers/geo.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { query } = require('express-validator');

const router = express.Router();

router.get('/distance', [
    query('lat').notEmpty().withMessage('latitude is required'),
    query('lng').notEmpty().withMessage('longitude is required'),
    query('serviceType').notEmpty().withMessage('service type (category) is required'),
], geoController.getNearbyProviders);

router.get('/suggestions' , geoController.getAutoSugesstion);

router.get('/get-address-from-coords', geoController.getAddressFromCoords)
module.exports = router;
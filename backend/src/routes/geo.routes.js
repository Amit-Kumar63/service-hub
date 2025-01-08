const express = require('express');
const geoController = require('../controllers/geo.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/distance' , geoController.getNearbyProviders);

router.get('/suggestions' , geoController.getAutoSugesstion);

router.get('/get-address-from-coords', geoController.getAddressFromCoords)
module.exports = router;
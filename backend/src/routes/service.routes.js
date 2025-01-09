const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const serviceController = require('../controllers/service.controller');
const { body } = require('express-validator');

const router = express.Router();

router.post('/create-service', [
    body('serviceType').notEmpty().withMessage('service type is required'),
    body('price').notEmpty().withMessage('price is required'),
], authMiddleware.providerAuth, serviceController.createServiceController);

module.exports = router
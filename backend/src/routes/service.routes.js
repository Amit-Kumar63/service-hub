const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const serviceController = require('../controllers/service.controller');
const { body, query } = require('express-validator');

const router = express.Router();

router.post('/create-service', [
    body('serviceType').notEmpty().withMessage('service type is required'),
    body('price').notEmpty().withMessage('price is required'),
], authMiddleware.providerAuth, serviceController.createServiceController);

router.get('/get-services-type', serviceController.getAllUniqueServicesTypeController);

router.post('/delete-service', authMiddleware.providerAuth,
    [
    query('serviceId').notEmpty().withMessage('serviceId is required'),
    ], serviceController.deleteServiceController);

module.exports = router
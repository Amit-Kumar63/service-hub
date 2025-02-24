const express = require('express');
const providerController = require('../controllers/provider.controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', [
    body('token').isString().withMessage('firebase token is required'),
], providerController.registerProvider);

router.post('/login', [
    body('token').isString().withMessage('firebase token is required'),
], providerController.loginProvider);

router.post('/logout', authMiddleware.providerAuth, providerController.logoutProvider);

router.get('/provider-profile', authMiddleware.providerAuth, providerController.providerProfile);
router.post('/add-provider-address', authMiddleware.providerAuth, [
    body('address').isLength({ min: 25 }).withMessage('address is must be atleast 25 characters long'),
    body('phone').isLength({ min: 10 }).withMessage('phone number is must be atleast 10 characters long'),
], providerController.addProviderAddress)

router.post('/edit-provider-profile', authMiddleware.providerAuth, [
    body('name').isString().isLength({ min: 3 }).withMessage('name is required'),
    body('phone').isLength({ min: 10 }).withMessage('phone number is must be atleast 10 characters long'),
    body('address').isLength({ min: 25 }).withMessage('address is must be atleast 25 characters long'),
], providerController.editProviderProfile);
module.exports = router;
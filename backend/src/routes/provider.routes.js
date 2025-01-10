const express = require('express');
const providerController = require('../controllers/provider.controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', [
    body('firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('address').isLength({ min: 25 }).withMessage('address is required'),
    body('phone').isLength({ min: 10 }).withMessage('phone number is required'),
], providerController.registerProvider);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], providerController.loginProvider);

router.get('/logout', providerController.logoutProvider);

router.get('/provider-profile', authMiddleware.providerAuth, providerController.providerProfile);

module.exports = router;
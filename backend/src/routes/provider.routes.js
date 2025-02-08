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

router.get('/logout', providerController.logoutProvider);

router.get('/provider-profile', authMiddleware.providerAuth, providerController.providerProfile);

module.exports = router;
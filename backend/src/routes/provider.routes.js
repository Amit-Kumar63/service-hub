const express = require('express');
const providerController = require('../controllers/provider.controller');
const { body } = require('express-validator');

const router = express.Router();

router.post('/register', [
    body('firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('city').isEmpty().withMessage('city is required'),
    body('street').isEmpty().withMessage('street is required'),
    body('locality').isEmpty().withMessage('locality is required'),
    body('number').isEmpty().withMessage('number is required'),
], providerController.registerProvider);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], providerController.loginProvider);

router.get('/logout', providerController.logoutProvider);

module.exports = router;
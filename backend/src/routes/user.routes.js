const express = require('express');
const userController = require('../controllers/user.controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', [
    body('firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('address').isLength({ min: 25 }).withMessage('please enter a valid address'),
    body('phone').isLength({ min: 10 }).withMessage('phone number is required'),
], userController.userRegister);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.userLogin);

router.get('/profile', authMiddleware.userAuth , userController.userProfile);

router.get('/logout', authMiddleware.userAuth, userController.userLogout);

router.post('/booking', [
    body('address').isEmpty().withMessage('address is required'),
    body('serviceDate').isEmpty().withMessage('service date is required'),
    body('serviceType').isEmpty().withMessage('service type is required')
] , authMiddleware.userAuth, userController.createBooking);

module.exports = router;
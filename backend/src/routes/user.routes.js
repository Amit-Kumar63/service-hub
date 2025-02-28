const express = require('express');
const userController = require('../controllers/user.controller');
const { body, query } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', [
    body('token').isString().withMessage('firebase token is required'),
], userController.userRegister);

router.post('/login', [
    body('token').isString().withMessage('firebase token is required'),
], userController.userLogin);

router.get('/profile', authMiddleware.userAuth , userController.userProfile);

router.post('/logout', authMiddleware.userAuth, userController.userLogout);

router.post('/add-to-favourites', [
    query('serviceId').isMongoId().withMessage('Invalid service id'),
], authMiddleware.userAuth, userController.addToFavourites);

router.post('/add-address', authMiddleware.userAuth, [
    body('address').isLength({ min: 25 }).withMessage('address is must be atleast 25 characters long'),
    body('phone').isLength({ min: 10 }).withMessage('phone number is must be atleast 10 characters long'),
], userController.addAddress)

router.post('/edit-user-profile', authMiddleware.userAuth, [
    body('name').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('phone').isLength({ min: 10 }).withMessage('phone number is must be atleast 10 characters long'),
    body('address').isLength({ min: 25 }).withMessage('address is must be atleast 25 characters long'),
], userController.editUserProfile);

router.post('/delete-bookings', authMiddleware.userAuth, [
    query('id').isMongoId().withMessage('Invalid booking id'),
], userController.deleteBooking);

module.exports = router;
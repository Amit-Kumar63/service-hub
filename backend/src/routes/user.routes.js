const express = require('express');
const userController = require('../controllers/user.controller');
const { body, query } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('token').isString().withMessage('Invalid token'),
], userController.userRegister);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.userLogin);

router.get('/profile', authMiddleware.userAuth , userController.userProfile);

router.get('/logout', authMiddleware.userAuth, userController.userLogout);

router.post('/add-to-favourites', [
    query('serviceId').isMongoId().withMessage('Invalid service id'),
], authMiddleware.userAuth, userController.addToFavourites);

module.exports = router;
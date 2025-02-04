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

router.post('/add-address', authMiddleware.userAuth,userController.addAddress)
router.get('/check-user-in-db', userController.checkUserInDB)
module.exports = router;
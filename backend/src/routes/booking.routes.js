const expires = require('express');
const { body } = require('express-validator');
const bookingController = require('../controllers/booking.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = expires.Router();

router.post('/book-service', [
    body('address').isEmpty().withMessage('address is required'),
    body('serviceDate').isEmpty().withMessage('service date is required'),
    body('provider').isEmpty().withMessage('provider is required'),
] , authMiddleware.userAuth, bookingController.createBooking);

module.exports = router;
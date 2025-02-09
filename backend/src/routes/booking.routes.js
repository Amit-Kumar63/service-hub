const expires = require('express');
const { body, query } = require('express-validator');
const bookingController = require('../controllers/booking.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = expires.Router();

router.post('/book-service', authMiddleware.userAuth,
    [
        body('address').isEmpty().withMessage('address is required'),
        body('serviceDate').isEmpty().withMessage('service date is required'),
        body('provider').isEmpty().withMessage('provider is required'),
        body('price').isEmpty().withMessage('price is required'),
        body('serviceType').isEmpty().withMessage('service type is required'),
    ] ,bookingController.createBooking);

router.post('/change-booking-status', [
    query('id').isMongoId().withMessage('Invalid booking id'),
    query('status').isIn(['completed', 'cancelled', 'declined', 'accepted']).withMessage('Invalid status'),
], authMiddleware.providerAuth, bookingController.changeStatus);

module.exports = router;
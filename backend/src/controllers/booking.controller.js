const { validationResult } = require('express-validator');
const bookingService = require('../services/booking.service');
const providerModel = require('../models/provider.model');

module.exports.createBooking = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { serviceDate, address, provider } = req.body;

    const user = req.user;
    if (!user) {
        throw new Error('User not found');
    }

    try {
       const booking = await bookingService.CreateBooking({
            user: user._id,
            provider,
            serviceDate,
            address,
        });
        user.bookings = booking._id;
        await user.save();
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        console.error(error);   
        res.status(400).json({ message: error.message });
    }
}
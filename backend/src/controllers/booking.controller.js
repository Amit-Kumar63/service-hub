const { validationResult } = require('express-validator');
const bookingService = require('../services/booking.service');
const providerModel = require('../models/provider.model');

module.exports.createBooking = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { serviceDate, address, provider: providerId, price, serviceType } = req.body;

    const provider = await providerModel.findById(providerId)
    if (!provider) {
        throw new Error('Provider not found');
    }
    const user = req.user;
    if (!user) {
        throw new Error('User not found');
    }
    try {
       const booking = await bookingService.CreateBooking({
            user: user._id,
            provider: provider._id,
            serviceDate,
            address,
            price,
            serviceType: serviceType
        });
        user.bookings = booking._id;
        provider.bookings = booking._id;
        await provider.save();
        await user.save();
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        console.error(error);   
        res.status(400).json({ message: error.message });
    }
}
module.exports.changeStatus = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { id, status } = req.query;
        if (!id || !status) {
            throw new Error('Invalid request');
        }
        const provider = req.provider;
        const booking = await bookingService.changeBookingStatus(id, status.toLowerCase(), provider);
        res.status(200).json({ message: 'Booking accepted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
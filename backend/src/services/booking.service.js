const bookingModel = require('../models/booking.model');

module.exports.CreateBooking = async ({
    user,
    provider,
    serviceDate,
    address,
    price,
    serviceType
}) => {
    try {
        const booking = await bookingModel.create({
            user,
            provider,
            serviceDate,
            address,
            price,
            serviceType
        });
        return booking;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports.getBookings = async (user) => {
    try {
        const bookings = await bookingModel.find({ user });
        return bookings;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports.changeBookingStatus = async (bookingId, status, provider) => {
    try {
        const booking = await bookingModel.findById(bookingId);
        if (booking.provider.toString() !== provider._id.toString()) {
            throw new Error('You are not authorized to change this booking status');
        }
        if (!booking) {
            throw new Error('Booking not found');
        }
        booking.status = status;
        await booking.save();
        return booking;
    } catch (error) {
        throw new Error(error.message);
    }
}
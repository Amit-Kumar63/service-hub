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
const bookingModel = require('../models/booking.model');

module.exports.CreateBooking = async ({
    user,
    provider,
    serviceDate,
    address
}) => {
    try {
        const booking = await bookingModel.create({
            user,
            provider,
            serviceDate,
            address,
        });
        return booking;
    } catch (error) {
        throw new Error(error.message);
    }
}
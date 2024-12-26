const bookingModel = require('../models/booking.model');

module.exports.CreateBooking = async ({
    user,
    serviceDate,
    address,
    serviceType
}) => {
    try {
        const booking = await bookingModel.create({
            user,
            serviceDate,
            address,
            serviceType
        });
        return booking;
    } catch (error) {
        throw new Error(error.message);
    }
}
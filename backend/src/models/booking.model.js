const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: [true, 'Provider is required']
    },
    serviceDate: {
        type: String,
        required: [true, 'Service date is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

const bookingModel = mongoose.model('Booking', bookingSchema);
module.exports = bookingModel;
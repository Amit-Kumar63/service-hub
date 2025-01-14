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
        enum: ['pendingForConfirmation', 'completed', 'cancelled', 'rejected', 'accepted'],
        default: 'pendingForConfirmation'
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    serviceType: {
        type: String,
        required: [true, 'Service type is required']
    }
}, { timestamps: true });

const bookingModel = mongoose.model('Booking', bookingSchema);
module.exports = bookingModel;
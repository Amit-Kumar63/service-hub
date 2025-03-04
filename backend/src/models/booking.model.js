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
        enum: ['pending', 'completed', 'cancelled', 'declined', 'accepted'],
        default: 'pending'
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    serviceType: {
        type: String,
        required: [true, 'Service type is required']
    },
    isGuestBooking: {
        type: Boolean,
        default: false
    },
    bookingExpiresAt: {
        type: Date,
        expires: 3600,
    }
}, { timestamps: true });

bookingSchema.pre('save', function (next) {
    if (this.isGuestBooking && !this.bookingExpiresAt) {
        this.bookingExpiresAt = new Date(Date.now() + 3600000);
    }
    next();
});
const bookingModel = mongoose.model('Booking', bookingSchema);
module.exports = bookingModel;
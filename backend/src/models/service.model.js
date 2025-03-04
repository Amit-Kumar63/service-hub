const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: [true, 'Provider is required']
    },
    serviceType: {
        type: String,
        required: [true, 'Service type is required']
    },
    bookingCount: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    isGuestService: {
        type: Boolean,
        default: false
    },
    serviceExpiresAt: {
        type: Date,
        expires: 3600,
    }
}, { timestamps: true });

serviceSchema.index({ provider: 1, serviceType: 1 }, { unique: true });
serviceSchema.statics.incrementBookingCount = async function (serviceId) {
    return await this.findByIdAndUpdate(
        serviceId,
        { $inc: { bookingCount: 1 } },
        { new: true }
    );
};

serviceSchema.pre('save', function (next) {
    if (this.isGuestService && !this.serviceExpiresAt) {
        this.serviceExpiresAt = new Date(Date.now() + 3600000);
    }
    next();
});
const serviceModel = mongoose.model('Service', serviceSchema);
module.exports = serviceModel;
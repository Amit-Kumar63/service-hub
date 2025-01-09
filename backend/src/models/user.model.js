const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        length: [3, 'First name must be at least 3 characters long']
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        length: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    location: {
        lat: {
            type: Number,
            required: [true, 'Latitude is required'],
        },
        lng: {
            type: Number,
            required: [true, 'Longitude is required'],
        }
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ]
});

userSchema.static('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateToken = function() {
    const token = jsonwebtoken.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;   
}

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
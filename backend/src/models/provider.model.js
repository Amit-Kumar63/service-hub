const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'First name is required'],
        length: [3, 'First name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email']
    },
    image: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    },
    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        }
    ],
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ],
    token: {
        type: String,
        required: [true, 'Token is required']
    },
    loggedIn: {
        type: String,   
    },
    uid: {
        type: String,
        required: [true, 'UID is required']
    }
});
const providerModel = mongoose.model('Provider', providerSchema);
module.exports = providerModel;
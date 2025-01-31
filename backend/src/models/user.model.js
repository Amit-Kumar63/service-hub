const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ],
    favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
    },
    ],
    token: {
        type: String,
        required: [true, 'Token is required']
    },
    uid: {
        type: String,
        required: [true, 'UID is required']
    }
}, { timestamps: true });

// userSchema.pre('save', async function(next) {
//     if(!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 12);
//     next();
// });

// userSchema.methods.comparePassword = async function(password) {
//     return await bcrypt.compare(password, this.password);
// }
userSchema.methods.generateToken = function() {
    const token = jsonwebtoken.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;   
}

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
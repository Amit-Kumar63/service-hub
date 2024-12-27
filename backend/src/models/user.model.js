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
    address: {
        city: {
            type: String,
            required: [true, 'City is required'],
        },
        street: {
            type: String,
            required: [true, 'Street is required'],
        },
        locality: {
            type: String,
            required: [true, 'Locality is required'],
        },
        number: {
            type: String,
            required: [true, 'Number is required'],
        }
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
    }
});

userSchema.pre('save', async function(next) {
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
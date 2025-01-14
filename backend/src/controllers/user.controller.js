const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const bookingService = require('../services/booking.service');
const { fetchLatLng } = require("../services/location.service");
const bookingModel = require('../models/booking.model');

module.exports.userRegister = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, password, address, phone } = req.body;
    
    let lat;
    let lng;
    await fetchLatLng(address)
    .then((response) => {
        lat = response.lat;
        lng = response.lng;
    }).catch((error) => {
        if (error.message === "Address not found.") {
            throw new Error("Error fetching location. Please enter valid address");
        }
    })
    try {
        const user = await userService.createUser({
            firstName,
            lastName,
            email,
            password,
            address,
            phone,
            location: {
                lat,
                lng
            }
        });
        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 3600000),
            httpOnly: true
        }
        const token = await user.generateToken();
        res.cookie('token', token, cookieOptions);
        res.status(201).json({user, token});

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.userLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        const user = await userService.findUserByCredentials(email, password);
        const token = await user.generateToken();
        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 3600000),
            httpOnly: true
        }
        res.cookie('token', token, cookieOptions);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.userLogout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
}

module.exports.userProfile = async (req, res) => {
    const user = req.user;
    await bookingModel.populate(user, [
        { path: 'bookings', populate: { path: 'provider', select: '-email -bookings -location -services' } },
    ])
    res.status(200).json({user, message: 'User profile fetched successfully'});
}
const userService = require('../services/user.service');
const { validationResult, cookie } = require('express-validator');
const { fetchLatLng } = require("../services/location.service");
const userModel = require('../models/user.model');
const admin = require('../firebase-admin');
const bookingService = require('../services/booking.service');
const {uploadOnCloudinary} = require('../services/cloudinary.service');

module.exports.userRegister = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { token } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(token)
    if (!decodedToken) return res.status(400).json({ message: 'Invalid user credentials' });

    const { uid, email, name, picture:image } = decodedToken

    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    try {
        const user = await userService.createUser({
            name,
            email,
            token,
            uid,
            image
        });
        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 3600000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        }
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
    const { token } = req.body;

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) return res.status(401).json({ message: 'User not found. Please signup' });
        const { uid, email } = decodedToken 

        const user = await userService.findUserByCredentials(email, uid);
        if (!user) return res.status(401).json({ message: 'User not found. Please signup' })
        await userModel.updateOne({ email }, { loggedIn: uid, token });
        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 3600000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        }
        res.cookie('token', user.token, cookieOptions);
        res.status(200).json({ user, token: user.token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.userLogout = async (req, res) => {
    const user = req.user;
    const result = await userModel.updateOne({email: user.email}, { loggedIn: null });
    if (!result) return res.status(400).json({ message: 'User logged in failed' });
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
}

module.exports.userProfile = async (req, res) => {
    try {
        const user = req.user;
        const populatedUser = await user.populate([
            {
                path: 'bookings',
                populate: {
                    path: 'provider',
                    select: '-bookings -services -location -email'
                }
            }
        ]);
        res.status(200).json({user: populatedUser, message: 'User profile fetched successfully'});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.addToFavourites = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }   
    const { serviceId } = req.query;
    try {
        const user = req.user;
        await userService.addToFavourites(user, serviceId);
        res.status(200).json({ message: 'Service added to favorites successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding to favorites', error: error.message });
    }
}

module.exports.addAddress = async (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const { address, phone } = req.body;
    const user = req.user;

    try {
            
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

        const result = await userModel.findByIdAndUpdate(user._id, { address, phone, location: { lat, lng } });
        if (!result) return res.status(400).json({ message: 'address not added' });
        res.status(200).json({ message: 'Address added successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports.editUserProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, address, phone } = req.body;
    const user = req.user;
    try {
        let updated
        if (user.name !== name) {
            user.name = name;
            updated = true;
        }
        if (user.address !== address) {
            user.address = address;
            updated = true;
        }
        if (user.phone !== phone) {
            user.phone = phone;
            updated = true;
        }
        if (!updated) {
            return res.status(400).json({ message: 'No changes detected' });
        }
        const result = await user.save();
        res.status(200).json({ message: 'User profile updated successfully', user: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports.deleteBooking = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { id } = req.query;
        if (!id) {
            throw new Error('Invalid request');
        }
        const user = req.user;
        await bookingService.deleteBooking(id, user);
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

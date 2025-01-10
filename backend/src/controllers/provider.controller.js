const providerModel = require('../models/provider.model');
const { validationResult } = require('express-validator');
const { fetchLatLng } = require("../services/location.service");
const { findProviderByCredentials } = require('../services/provider.service');

module.exports.registerProvider = async (req, res) => {
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
        const provider = await providerModel.create({
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
        const token = await provider.generateToken();
        res.cookie('provider-token', token, cookieOptions);
        res.status(201).json({ provider, token , message: 'Provider registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports.loginProvider = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const provider = await findProviderByCredentials(email, password);
        const token = await provider.generateToken();
        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 3600000),
            httpOnly: true
        }
        res.cookie('provider-token', token, cookieOptions);
        res.status(200).json({ provider, token, message: 'Provider logged in successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports.logoutProvider = async (req, res) => {
    res.clearCookie('provider-token');
    res.status(200).json({ message: 'Provider logged out successfully' });
}
module.exports.providerProfile = async (req, res) => {
    try {
        const provider = req.provider;
        res.status(200).json({ provider, message: 'Provider profile fetched successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
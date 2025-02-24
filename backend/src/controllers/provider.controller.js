const providerModel = require('../models/provider.model');
const { validationResult } = require('express-validator');
const { fetchLatLng } = require("../services/location.service");
const providerService = require('../services/provider.service');
const admin = require('../firebase-admin');

module.exports.registerProvider = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { token } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(token)
    if (!decodedToken) return res.status(400).json({ message: 'Invalid credentials' });

    const { uid, email, name, picture:image } = decodedToken

    const existingProvider = await providerModel.findOne({ email });
    if (existingProvider) return res.status(400).json({ message: 'Provider already exists' });
    try {
        const provider = await providerService.createProvider({
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
        res.cookie('providerToken', token, cookieOptions);
        res.status(201).json({provider, token, message: 'Provider registered successfully'});

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports.loginProvider = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { token } = req.body;

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) return res.status(401).json({ message: 'Provider not found. Please signup' });
        const { uid, email } = decodedToken 

        const provider = await providerService.findProviderByCredentials(email, uid);
        if (!provider) return res.status(401).json({ message: 'Provider  not found. Please signup' })
        await providerModel.updateOne({ email }, { loggedIn: uid, token });
        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 3600000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        }
        res.cookie('providerToken', provider.token, cookieOptions);
        res.status(200).json({ provider, token: provider.token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports.logoutProvider = async (req, res) => {
    const provider = req.provider;
    const result = await providerModel.updateOne({uid: provider.uid}, { loggedIn: null });
    if (!result) return res.status(400).json({ message: 'Provider logged in failed' });
    res.clearCookie('providerToken');
    res.status(200).json({ message: 'User logged out successfully' });
}
module.exports.providerProfile = async (req, res) => {
    try {
        const provider = req.provider;
        const populatedProvider = await provider.populate([
            {
                path: 'bookings',
                populate: {
                    path: 'user',
                    select: '-bookings -favourites -location -email'
                }
            },
            {
                path: 'services',
                populate: {
                    path: 'provider',
                }
            }
        ]);
        res.status(200).json({provider: populatedProvider, message: 'Provider profile fetched successfully'});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports.addProviderAddress = async (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const { address, phone } = req.body;
    const provider = req.provider;
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

        const result = await providerModel.findByIdAndUpdate(provider._id, { address, phone, location: { lat, lng } });
        if (!result) return res.status(400).json({ message: 'address not added' });
        res.status(200).json({ message: 'Address added successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.editProviderProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, address, phone } = req.body;
    const provider = req.provider;
    try {
        let updated
        if (provider.name !== name) {
            provider.name = name;
            updated = true;
        }
        if (provider.address !== address) {
            provider.address = address;
            updated = true;
        }
        if (provider.phone !== phone) {
            provider.phone = phone;
            updated = true;
        }
        if (!updated) {
            return res.status(400).json({ message: 'No changes detected' });
        }
        const result = await provider.save();
        res.status(200).json({ message: 'Provider profile updated successfully', user: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
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
    res.clearCookie('provider-token');
    res.status(200).json({ message: 'Provider logged out successfully' });
}
module.exports.providerProfile = async (req, res) => {
    try {
        const provider = req.provider;
        const populatedProvider = await provider.populate([
            {
                path: 'services',
                populate: {
                    path: 'users',
                    select: '-bookings -favourites -location -email'
                }
            }
        ]);
        res.status(200).json({provider: populatedProvider, message: 'Provider profile fetched successfully'});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
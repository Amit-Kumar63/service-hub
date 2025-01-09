const { validationResult } = require('express-validator');
const serviceModel = require('../models/service.model');

module.exports.createServiceController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { serviceType, price, description } = req.body;   
    const provider = req.provider
    if (!provider) {
        throw new Error('Provider not found');
    }
    try {
        const service = await serviceModel.create({
            provider: provider._id,
            serviceType,
            price,
            description
        });
        res.status(201).json({ service });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
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
        provider.services.push(service._id);
        await provider.save();
        res.status(201).json({ service });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.getAllUniqueServicesTypeController = async (req, res) => {
    try {
        const AllServices = await serviceModel.find();
        const uniqueServiceType = [...new Set(AllServices.map(service => service.serviceType.toLowerCase()))];
        res.status(200).json({ uniqueServiceType });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.deleteServiceController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const serviceId = req.query.serviceId;
    try {
        const deleted = await serviceModel.findByIdAndDelete(serviceId);
        if (!deleted) {
            throw new Error('Service not found');
        }
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
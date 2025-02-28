const { validationResult } = require("express-validator");
const serviceModel = require("../models/service.model");
const { uploadOnCloudinary } = require("../services/cloudinary.service");

module.exports.createServiceController = async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { serviceType, price, description } = req.body;
    const provider = req.provider;
    const file = req.file;

    try {
        if (!file) throw new Error("Image is required");

        if (!provider) throw new Error("Provider not found");

        const existingService = await serviceModel.findOne({ serviceType });
        if (existingService) throw new Error("Service already exists");

        const imageUrl = await uploadOnCloudinary(file.path);

        if (!imageUrl) throw new Error("ImageUrl not returned from cloudinary");
        
        const service = await serviceModel.create({
            provider: provider._id,
            serviceType,
            price,
            description,
            image: imageUrl,
        });
        provider.services.push(service._id);
        await provider.save();
        res.status(201).json({ service });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getAllUniqueServicesTypeController = async (req, res) => {
    try {
        const AllServices = await serviceModel.find();
        const uniqueServiceType = [...new Set(AllServices)]
        res.status(200).json({ uniqueServiceType });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.deleteServiceController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const serviceId = req.query.serviceId;
    try {
        const deleted = await serviceModel.findByIdAndDelete(serviceId);
        if (!deleted) {
            throw new Error("Service not found");
        }
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

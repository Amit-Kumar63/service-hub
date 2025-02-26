const providerModel = require('../models/provider.model');
const { getAddressSuggestions, fetchAddressFromCoords } = require('../services/location.service');
const GeographicLib = require('geographiclib');
const geod = GeographicLib.Geodesic.WGS84;
const {formatTime} = require('../utils/time.format');
const { validationResult } = require('express-validator');
const serviceModel = require('../models/service.model');

module.exports.getNearbyProviders = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { lat, lng, serviceType } = req.query;

    if (!lat || !lng || !serviceType) {
        return res.status(400).json({ message: "Latitude, longitude, and service type are required." });
    }

    const customerlat = parseFloat(lat);
    const customerlng = parseFloat(lng);
    const distanceRadius = 10; // in kilometers
    const averageSpeed = 30; // in km/h

    try {
        const providers = await providerModel.find({});

        const nearbyProviders = await Promise.all(
            providers.map(async (provider) => {

                const result = geod.Inverse(customerlat, customerlng, parseFloat(provider.location.lat), parseFloat(provider.location.lng));
                const distance = Math.round(result.s12 / 1000); 

                if (distance > distanceRadius) {
                    return null;
                }

                const services = await serviceModel.find({ provider: provider._id, serviceType: { $regex: new RegExp(`^${serviceType}$`, 'i') } });
                if (services.length === 0) {
                    return null;
                }

                const timeInHours = distance / averageSpeed;
                const timeInSeconds = timeInHours * 3600;
                const formattedTime = formatTime(timeInSeconds);

                return {
                    distance,
                    formattedTime,
                    provider: {
                        ...provider._doc,
                    },
                    services,
                };
            })
        );

        // Filter out null values (providers that didn't match criteria)
        const filteredProviders = nearbyProviders.filter((provider) => provider !== null);

        if (filteredProviders.length === 0) {
            return res.status(404).json({ message: "No nearby providers found for the specified service type." });
        }
        res.status(200).json({ nearbyProviders: filteredProviders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports.getAutoSugesstion = async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ message: "Query parameter is required." });
    }
    const suggestions = await getAddressSuggestions(query)
    res.status(200).json({ suggestions });
}
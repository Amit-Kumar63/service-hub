const providerModel = require('../models/provider.model');
const { getAddressSuggestions, fetchAddressFromCoords } = require('../services/location.service');
const GeographicLib = require('geographiclib');
const geod = GeographicLib.Geodesic.WGS84;
const {formatTime} = require('../utils/time.format');

module.exports.getNearbyProviders = async (req, res) => {
    const { lat, lng } = req.query;
    const customerlat = parseFloat(lat);
    const customerlng = parseFloat(lng);
    const distanceRadius = 10; // in kilometers
    const averageSpeed = 40; // in km/h

    const providers = await providerModel.find({ });

    const nearbyProviders = providers.map(provider => {
        const result = geod.Inverse(customerlat, customerlng, parseFloat(provider.location.lat), parseFloat(provider.location.lng));
        const distance = Math.round(result.s12 / 1000); // in km
        const timeInHours = distance / averageSpeed ;
        const timeInSeconds = timeInHours * 3600;

        const formatedTime = formatTime(timeInSeconds); // Format time in hours and minutes
        return {
            distance,
            formatedTime,
            ...provider._doc
        };
    }).filter(provider => {
        return provider.distance <= distanceRadius;
    }
    )

    res.status(200).json({ nearbyProviders });
};

module.exports.getAutoSugesstion = async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ message: "Query parameter is required." });
    }
    const suggestions = await getAddressSuggestions(query)
    res.status(200).json({ suggestions });
}

module.exports.getAddressFromCoords = async (req, res) => {
    const coords = req.body
    const address = await fetchAddressFromCoords(coords)
    if (!address) {
        throw new Error('something went wrong while fetching address from coords')
    }
    res.status(200).json({ address })
}
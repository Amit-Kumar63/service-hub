const providerModel = require('../models/provider.model');
const { haversineDistance } = require('../utils/geo.utils');

module.exports.getNearbyProviders = async (req, res) => {
    const { lat, lng } = req.query;
    const customerCoords = { lat: parseFloat(lat), lng: parseFloat(lng) };
    const distanceRadius = 10
    
    const provider = await providerModel.find({ })
    
    const nearbyProviders = provider.filter(provider => {
        const distance = haversineDistance(customerCoords, provider.location);
        return distance <= distanceRadius;
    })

    res.status(200).json({ nearbyProviders });
}
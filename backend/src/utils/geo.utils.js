const axios = require('axios');

module.exports.haversineDistance = (coords1, coords2) => {
    
    const toRad = (value) => (value * Math.PI) / 180;
    
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = coords1.lat;
    const lon1 = coords1.lng;
    const lat2 = coords2.lat;
    const lon2 = coords2.lng;
  
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    if (distance < 10) {
      const deltaLat = (lat2 - lat1) * 110.574; // Approx in km per degree lat
      const deltaLon = (lon2 - lon1) * (111.320 * Math.cos(toRad(lat1))); // Approx in km per degree lon
      return Math.sqrt(deltaLat ** 2 + deltaLon ** 2);
  }
    console.log('Distance',distance);
    console.log('Time', distance / 60);    
    return distance; // Distance in kilometers
  };

  
module.exports.getDistance = async (customerCoordsLat, customerCoordsLng, providerCoordsLat, providerCoordsLng) => {
  const profile = 'driving';
  const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
  
  if (!accessToken) {
    throw new Error("Mapbox access token is missing. Please set MAPBOX_ACCESS_TOKEN in your environment variables.");
  }

  const url = `https://api.mapbox.com/directions-matrix/v1/mapbox/${profile}/${customerCoordsLng},${customerCoordsLat};${providerCoordsLng},${providerCoordsLat}.json?&access_token=${accessToken}`;

  try {
    const response = await axios.get(url);
    const distance = response.data.destinations[0].distance;
    const duration = response.data.durations[0][1];    
    console.log(response.data);
    
    return {
      distance: distance / 1000, // Distance in kilometers
      duration: duration / 60, // Duration in minutes
    }
  } catch (error) {
    console.error('Error fetching distance:', error.response?.data || error.message);
    throw new Error('Failed to fetch distance from Mapbox API');
  }
};
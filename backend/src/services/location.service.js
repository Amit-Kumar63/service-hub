const axios = require('axios');

module.exports.fetchLatLng = async (address) => {
  const API_KEY = process.env.MAPBOX_ACCESS_TOKEN; // Mapbox API Token
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${API_KEY}&limit=1&country=IN`;

  try {
    const response = await axios.get(url);

    if (response.data.features.length > 0) {
      const bestMatch = response.data.features[0];
      const [lng, lat] = bestMatch.center;
      return { lat, lng };
    } else {
      console.error("Address not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    return null;
  }
};

module.exports.getAddressSuggestions = async (query) => {
  if (!query) {
    return [];
  }
  const API_KEY = process.env.MAPBOX_ACCESS_TOKEN;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    query
  )}.json?access_token=${API_KEY}&limit=5&country=IN`;

  try {
    const response = await axios.get(url);
    return response.data.features.map((feature) => {
      return {
        place_name: feature.place_name,
        center: feature.center,
      };
    });
  } catch (error) {
    console.error("Error fetching address suggestions:", error);
    return [];
  }
}

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

module.exports.fetchAddressFromCoords = async (coords) => {
  if (!coords) {
    throw new Error('coords is required!')
  }
  const { lat, lng } = coords;
  try {
      const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}&country=IN`;
      const response = await axios.get(url)
      if (response.data && response.data.features && response.data.features.length > 0) {
        return response.data.features[0].place_name; // Full address
      } else {
          return "Address not found";
      }

  } catch (error) {
    throw new Error(error)
  }
}
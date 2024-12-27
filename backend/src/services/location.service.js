const axios = require('axios');

module.exports.fetchLatLng = async (address) => {
  const API_KEY = `${process.env.OPENCAGE_API_KEY}`; 
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
  
    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      console.log("Latitude:", lat, "Longitude:", lng);
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
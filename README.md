# service-hub



step 1

import axios from "axios";

const fetchLatLng = async (address) => {
  const API_KEY = "YOUR_OPENCAGE_API_KEY"; // Replace with your OpenCage API key
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

// Example usage:
const address = "1600 Amphitheatre Parkway, Mountain View, CA";
fetchLatLng(address).then((location) => {
  if (location) {
    console.log("Fetched Location:", location);
  }
});

step 2

import React, { useState } from "react";
import axios from "axios";

const GeocodeForm = () => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(null);

  const handleGeocode = async () => {
    const API_KEY = "YOUR_OPENCAGE_API_KEY"; // Replace with your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address
    )}&key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        setLocation({ lat, lng });
        console.log("Latitude:", lat, "Longitude:", lng);
      } else {
        alert("Address not found.");
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      alert("Failed to fetch location.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Geocode Address</h1>
      <input
        type="text"
        placeholder="Enter address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="p-2 border rounded w-full mb-2"
      />
      <button
        onClick={handleGeocode}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Get Coordinates
      </button>

      {location && (
        <div className="mt-4">
          <p>
            <strong>Latitude:</strong> {location.lat}
          </p>
          <p>
            <strong>Longitude:</strong> {location.lng}
          </p>
        </div>
      )}
    </div>
  );
};

export default GeocodeForm;

step 3

const saveLocation = async (lat, lng) => {
  try {
    await axios.post("/api/save-location", { lat, lng });
    console.log("Location saved successfully.");
  } catch (error) {
    console.error("Error saving location:", error);
  }
};

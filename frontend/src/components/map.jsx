import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

const LocationPicker = ({ setLatLng }) => {
  const [position, setPosition] = useState(null);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]); // Update marker position
        setLatLng({ lat, lng }); // Pass lat/lng to parent via prop
      },
    });
    return position ? <Marker position={position} /> : null;
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px" , width: "100%"}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <MapClickHandler />
    </MapContainer>
  );
};

export default LocationPicker;

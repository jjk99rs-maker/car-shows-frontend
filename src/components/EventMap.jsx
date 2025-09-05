import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function EventMap({ events }) {
  const center = { lat: 56.1304, lng: -106.3468 }; // Canada center
  const mapContainerStyle = { width: "100%", height: "100%" };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={4}>
        {events.map((event) => (
          <Marker
            key={event.id}
            position={event.location}
            title={event.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default EventMap;

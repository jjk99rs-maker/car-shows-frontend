import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px"
};

const center = {
  lat: 56.1304, // center of Canada
  lng: -106.3468
};

export default function EventMap({ events }) {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={4}
      >
        {events.map((event) => (
          <Marker
            key={event.id}
            position={{ lat: event.lat, lng: event.lng }}
            title={event.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

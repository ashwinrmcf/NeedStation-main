import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";

// Libraries constant outside the component
const libraries = ["places"];

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "12px",
};

const center = {
  lat: 22.7196, // Default center (Indore)
  lng: 75.8577,
};

const MapPicker = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(center);
  const [autocomplete, setAutocomplete] = useState(null);
  const [map, setMap] = useState(null);

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address,
      };
      setMarkerPosition(location);
      onLocationSelect(location);
    }
  };

  const handleMapClick = (e) => {
    const clickedLat = e.latLng.lat();
    const clickedLng = e.latLng.lng();
    
    // Create a temporary location object for the marker
    const tempLocation = {
      lat: clickedLat,
      lng: clickedLng,
    };
    setMarkerPosition(tempLocation);
    
    // Use Geocoder to get the address from coordinates
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat: clickedLat, lng: clickedLng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const formattedAddress = results[0].formatted_address;
        const location = {
          lat: clickedLat,
          lng: clickedLng,
          address: formattedAddress,
        };
        setMarkerPosition(location);
        onLocationSelect(location);
      } else {
        // Fallback if geocoding fails
        const location = {
          lat: clickedLat,
          lng: clickedLng,
          address: "Unknown location", // Better fallback than coordinates
        };
        onLocationSelect(location);
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBwNUkrw0WOChZUk6PVTMB-4F5eV0frh1o" libraries={["places"]}>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search your location"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `100%`,
            height: `40px`,
            padding: `0 12px`,
            marginBottom: `10px`,
            borderRadius: `8px`,
            color: `black`
          }}
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={18}
        onClick={handleMapClick}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapPicker;

import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "12px"
};

const center = {
  lat: 22.7196, // Default to Indore
  lng: 75.8577,
};

const MapPicker = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(center);
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    // Check if geolocation is available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = {
            lat: latitude,
            lng: longitude,
            address: "Current Location",
          };
          setMarkerPosition(location);
        },
        () => {
          console.error("Geolocation failed. Defaulting to Indore.");
          // Fallback to Indore if geolocation fails
          setMarkerPosition({
            lat: 22.7196,
            lng: 75.8577,
            address: "Indore",
          });
        }
      );
    } else {
      console.error("Geolocation is not available. Defaulting to Indore.");
      // Fallback to Indore if geolocation is not available
      setMarkerPosition({
        lat: 22.7196,
        lng: 75.8577,
        address: "Indore",
      });
    }
  }, []);  
  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (!place.geometry) return; // guard in case no geometry is returned

      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address
      };
      setMarkerPosition(location);
      onLocationSelect(location);
    }
  };

  const handleMapClick = (e) => {
    const location = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      address: `Lat: ${e.latLng.lat()}, Lng: ${e.latLng.lng()}`
    };
    setMarkerPosition(location);
    onLocationSelect(location);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBwNUkrw0WOChZUk6PVTMB-4F5eV0frh1o" libraries={["places"]}>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search your location"
          style={{
            boxSizing: "border-box",
            border: "1px solid transparent",
            width: "100%",
            height: "40px",
            padding: "0 12px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={80}
        onClick={handleMapClick}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapPicker;

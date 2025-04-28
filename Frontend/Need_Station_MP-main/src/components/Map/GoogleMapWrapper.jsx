// components/Map/GoogleMapWrapper.jsx
import React from "react";
import { LoadScript } from "@react-google-maps/api";

const GoogleMapWrapper = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey=" " libraries={["places"]}>
      {children}
    </LoadScript>
  );
};

export default GoogleMapWrapper;

// components/Map/GoogleMapWrapper.jsx
import React from "react";
import { LoadScript } from "@react-google-maps/api";

const GoogleMapWrapper = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBwNUkrw0WOChZUk6PVTMB-4F5eV0frh1o" libraries={["places"]}>
      {children}
    </LoadScript>
  );
};

export default GoogleMapWrapper;

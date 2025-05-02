package com.example.authbackend.dto;

public class LocationDTO {
    private String username; // Changed to username
    private Double lat;
    private Double lng;
    private String address;

    public String getUsername() {
        return username;  // Updated getter for username
    }

    public void setUsername(String username) {
        this.username = username;  // Updated setter for username
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}

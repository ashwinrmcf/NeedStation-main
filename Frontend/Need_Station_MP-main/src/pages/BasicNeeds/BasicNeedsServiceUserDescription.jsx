import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";  // Added useLocation to access route state
import styles from "./BasicNeedsServiceUserDescription.module.css";
import ScrollToTop from "../../hooks/ScrollToTop";
import MapPicker from "../../components/Map/MapPicker.jsx";

const BasicNeedsServiceUserDescription = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract service information from the location state
  const serviceInfo = location.state || {};
  const { service, description, serviceType } = serviceInfo;

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setSubmitMessage("");
  };

  const submitLocationToDatabase = async () => {
    if (!selectedLocation) {
      setSubmitMessage("❗ Please select a location first");
      return;
    }

    const username = localStorage.getItem("username");  // ✅ Correct way to get email

    if (!username) {
      setSubmitMessage("❗ User email not found. Please login again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/api/user/update-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,                 // ✅ Correct email coming from localStorage
          address: selectedLocation.address,
          lat: selectedLocation.lat,
          lng: selectedLocation.lng
        }),
      });

      if (response.ok) {
        setSubmitMessage("✅ Location successfully saved!"); // ✅ navigate only after success
      } else {
        const errorData = await response.json().catch(() => null);
        console.error("Server error:", errorData);
        setSubmitMessage(`❌ Failed to save location: ${errorData?.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting location:", error);
      setSubmitMessage("❌ Error connecting to server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <ScrollToTop />
      <div className={styles["header"]}>
        <Link to="/">
          <div className={styles["logo"]}>
            Need<span style={{ color: "#5CE1E6" }}>Station</span>
          </div>
        </Link>
        <div className={styles["progress-bar"]}>
          <div className={`${styles["step"]} ${styles["active"]}`}>
            <div className={styles["circle"]}></div>
          </div>{" "}
          <div className={styles["line1"]}></div>{" "}
          <span className={styles["describe-task"]}>Describe your Task</span>
          <div className={styles["line1"]}></div>
          <div className={styles["step"]}>
            <div className={styles["circle"]}></div>
          </div>
          <div className={styles["line"]}></div>
          <div className={styles["step"]}>
            <div className={styles["circle"]}></div>
          </div>
          <div className={styles["line"]}></div>
          <div className={styles["step"]}>
            <div className={styles["circle"]}></div>
          </div>
        </div>
      </div>

      <div className={styles["task-section"]}>
        <div className={styles["box"]}>
          <h1>Your Task Location</h1>
          <div style={{ marginTop: "20px", position: "relative" }}>
            <MapPicker onLocationSelect={handleLocationSelect} />
            
            {/* Display location details including lat/long */}
            {selectedLocation && (
              <div style={{ color: "white", marginTop: "20px" }}>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Selected Location:</strong> {selectedLocation.address}
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div>
                    <strong>Latitude:</strong> {selectedLocation.lat.toFixed(6)}
                  </div>
                  <div>
                    <strong>Longitude:</strong> {selectedLocation.lng.toFixed(6)}
                  </div>
                </div>
              </div>
            )}
            
            {/* Location submit button positioned at bottom right */}
            <button 
              onClick={submitLocationToDatabase}
              disabled={isSubmitting || !selectedLocation}
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                backgroundColor: "#5CE1E6",
                color: "#000",
                border: "none",
                borderRadius: "5px",
                padding: "8px 15px",
                cursor: selectedLocation ? "pointer" : "not-allowed",
                opacity: selectedLocation ? 1 : 0.7,
                fontWeight: "bold",
                zIndex: 10
              }}
            >
              {isSubmitting ? "Saving..." : "Save Location"}
            </button>
            
            {submitMessage && (
              <div style={{ 
                color: submitMessage.includes("successfully") ? "#5CE1E6" : "#ff5c5c", 
                marginTop: "10px",
                fontSize: "14px" 
              }}>
                {submitMessage}
              </div>
            )}
          </div>
        </div>

        <div className={styles["task-box"]}>
          <h1>Task Duration</h1>
          <h1>How big is your task?</h1>
          <div className={styles["task1"]}>
            <form className={styles["form"]}>
              <label>
                <input
                  type="radio"
                  name="duration"
                  value="small"
                  style={{ height: "25px", width: "25px" }}
                />{" "}
                Small 1 hr
              </label>
              <label>
                <input
                  type="radio"
                  name="duration"
                  value="medium"
                  style={{ height: "25px", width: "25px" }}
                />{" "}
                Medium 2-3 hr
              </label>
              <label>
                <input
                  type="radio"
                  name="duration"
                  value="large"
                  style={{ height: "25px", width: "25px" }}
                />{" "}
                Large 4+ hr
              </label>
            </form>
          </div>
        </div>

        <div className={styles["box"]}>
          <h1>Tell us the details of your task</h1>
          <textarea
            style={{
              width: "98%",
              height: "228px",
              fontSize: "25px",
            }}
            placeholder={service 
              ? `I need a professional ${service} service. ${description || ''}` 
              : "Need a reliable and efficient tasker to clean my apartment."}
          ></textarea>
        </div>
      </div>

      <div className={styles["button-container"]}>
        <Link 
          to="/available-helpers"
          state={{ 
            service: service || serviceType || 'General Service',
            description: description,
            serviceType: serviceType 
          }}
        >
          {" "}
          <button className={styles["button"]}>
            See Taskers and Price
          </button>{" "}
        </Link>
      </div>
    </>
  );
};

export default BasicNeedsServiceUserDescription;

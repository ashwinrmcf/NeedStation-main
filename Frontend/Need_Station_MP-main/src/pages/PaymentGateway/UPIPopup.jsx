import React from "react";
import styles from "./PaymentPopup.module.css";

const UPIPopup = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleBackgroundClick = (event) => {
    if (event.target.id === "popupContainer") {
      onClose(); // Close popup when clicking the background
    }
  };

  return (
    <div
      id="popupContainer"
      className={styles["popup"]}
      onClick={handleBackgroundClick}
    >
      <div className={styles["popup-content"]}>
        <div className={styles["popup-header"]}>
          <h2>Add new UPI</h2>
          <span
            className={styles["close-btn"]}
            onClick={onClose} // Close button
          >
            ×
          </span>
        </div>
        <form>
          <input
            type="text"
            placeholder="12345678@upi"
            className={styles["input-box"]}
          />
          <div className={styles["checkbox"]}>
            <input type="checkbox" id="save-upi" />
            <label htmlFor="save-upi">Save my UPI ID securely</label>
          </div>
          <button type="button" className={styles["proceed-btn"]}>
            Proceed to pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default UPIPopup;

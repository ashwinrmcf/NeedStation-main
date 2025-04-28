import React from "react";
import styles from "./PaymentPopup.module.css";

const CardPopup = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleBackgroundClick = (event) => {
    if (event.target.id === "popupContainer") {
      onClose(); // Close popup when the background is clicked
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
          <h2>Add new Card</h2>
          <span
            className={styles["close-btn"]}
            onClick={onClose} 
          >
            ×
          </span>
        </div>
        <form>
          <label htmlFor="card-number">Card Number</label>
          <input
            type="text"
            id="card-number"
            placeholder="Card Number"
            className={styles["input-box"]}
          />

          <label htmlFor="expiry-date">Expiry Date (MM/YY)</label>
          <input
            type="text"
            id="expiry-date"
            placeholder="MM/YY"
            className={styles["input-box"]}
          />

          <label htmlFor="cvv">CVV</label>
          <input
            type="password"
            id="cvv"
            placeholder="CVV"
            className={styles["input-box"]}
          />

          <div className={styles["checkbox"]}>
            <input type="checkbox" id="save-card" />
            <label htmlFor="save-card">
              Save the card details (except CVV) securely.{" "}
              <a href="#">Know more</a>
            </label>
          </div>

          <button type="button" className={styles["proceed-btn"]}>
            Save & proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default CardPopup;

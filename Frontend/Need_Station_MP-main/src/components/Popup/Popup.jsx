import React from "react";
import styles from "./Popup.module.css";
import { Link } from "react-router-dom";

const Popup = ({ isVisible, onClose, data }) => {
  if (!isVisible) return null; // Return nothing if the popup is not visible

  const handleBackgroundClick = (event) => {
    if (event.target.id === "popupContainer") {
      onClose(); // Close popup when the background is clicked
    }
  };

  return (
    <div
      id="popupContainer"
      className={styles.container3}
      onClick={handleBackgroundClick}
    >
      <div className={styles.popupContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.mnf}>{data.popup.heading}</h2>
        <div className={styles.iconContainer}>
          {data.popup.cards.map((card) => (
            <Link to = {card.link}> <div key={card.id} className={styles.service}>
              <button
                className={styles.imgew}
                style={{
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: "cover",
                }}
              ></button>
              <p className={styles.trw}>{card.title}</p>
              <p className={styles.cardDescription}>{card.dscription}</p>
            </div> </Link>
          ))} 
        </div>
      </div>
    </div>
  );
};

export default Popup;

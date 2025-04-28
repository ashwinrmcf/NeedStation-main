import React, { useState } from "react";
import styles from "./ServiceDetails.module.css";
import Popup from "../Popup/Popup.jsx";

const ServiceDetails = ({ data }) => {
  if (!data) {
    return <div>Error: Service data is not available.</div>;
  }

  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleBookNowClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["text-content"]}>
          <h1>
            {data.heading.split("").map((letter, index) => (
              <span
                key={index}
                className={`${styles["letter"]} ${
                  letter === " " ? styles["nextWord"] : ""
                }`}
              >
                {letter}
              </span>
            ))}

          </h1>
          <p>{data.description}</p>
          <ul>
            {data.highlights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h2>Services Offered</h2>
          <ul className="services-list">
            {data.offeredServices.map((service, index) => (
              <li key={index} className={styles["ule"]}>
                {service}
              </li>
            ))}
          </ul>
          <button
            className={styles["book-button"]}
            onClick={handleBookNowClick}
          >
            Book Now
          </button>
          <Popup isVisible={isPopupVisible} onClose={handleClosePopup} data={data} />
        </div>
        <div className={styles["image-container"]}>
          <div className={styles["i21"]}>
            {data.images.map((image, index) => (
              <img key={index} src={image} alt={`Service example ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;

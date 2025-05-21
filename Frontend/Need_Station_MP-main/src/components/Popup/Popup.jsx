import React from "react";
import styles from "./Popup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

const Popup = ({ isVisible, onClose, data }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  if (!isVisible) return null; // Return nothing if the popup is not visible

  const handleBackgroundClick = (event) => {
    if (event.target.id === "popupContainer") {
      onClose(); // Close popup when the background is clicked
    }
  };
  
  // Handle click on service card - check auth before redirecting
  const handleServiceClick = (card, event) => {
    event.preventDefault();
    
    // If user is not logged in, redirect to login with redirect info
    if (!user) {
      navigate('/login', {
        state: {
          redirectAfterLogin: '/user-details',
          serviceData: {
            service: card.title,
            description: card.dscription || data.description,
            serviceType: data.heading
          }
        }
      });
    } else {
      // If logged in, redirect to the intended page
      if (card.link.includes('user-details')) {
        navigate('/user-details', {
          state: {
            service: card.title,
            description: card.dscription || data.description,
            serviceType: data.heading
          }
        });
      } else {
        navigate(card.link);
      }
    }
    
    onClose(); // Close the popup after navigating
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
            <a href="#" onClick={(e) => handleServiceClick(card, e)} key={card.id}> 
              <div className={styles.service}>
                <button
                  className={styles.imgew}
                  style={{
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: "cover",
                  }}
                ></button>
                <p className={styles.trw}>{card.title}</p>
                <p className={styles.cardDescription}>{card.dscription}</p>
              </div> 
            </a>
          ))} 
        </div>
      </div>
    </div>
  );
};

export default Popup;

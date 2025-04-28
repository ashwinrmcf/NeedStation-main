import styles from './PaymentGateway.module.css';
import image1 from "../../assets/images/payment/internet.png";
import image2 from "../../assets/images/payment/upi.png";
import image3 from "../../assets/images/payment/card.png";
import image4 from "../../assets/images/payment/note.webp";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiArrowRightSLine } from "react-icons/ri";
import { useState } from 'react';
import InternetBankingPopup from './InternetBankingPopup.jsx';
import UPIPopup from './UPIPopup.jsx';
import CardPopup from './CardPopup.jsx';
import { Link } from 'react-router-dom';


const PaymentGateway = () => {
  const [isInternetBankingPopupVisible, setInternetBankingPopupVisible] = useState(false);

  const handleInternetBankingClick = () => {
    setInternetBankingPopupVisible(true); 
  };

  const handleCloseInternetBankingPopup = () => {
    setInternetBankingPopupVisible(false); 
  };


  const [isUPIPopupVisible, setUPIPopupVisible] = useState(false);

  const handleUPIClick = () => {
    setUPIPopupVisible(true); 
  };

  const handleCloseUPIPopup = () => {
    setUPIPopupVisible(false); 
  };


  const [isCardPopupVisible, setCardPopupVisible] = useState(false);

  const handleCardClick = () => {
    setCardPopupVisible(true); 
  };

  const handleCloseCardPopup = () => {
    setCardPopupVisible(false); 
  };

  return (
    <>
      <div className={styles["payment-container"]}>
        <header className={styles["header"]}>
          <Link to="/basic-needs/user-details" className={styles["back-btn"]}><FaArrowLeftLong /></Link>
          <h1>Select payment method</h1>
          <p className={styles["par1"]}>Amount to pay:</p>
        </header>
        <div className={styles["payment-method"]}>
          <h2>Internet Banking</h2>
          <div className={styles["method"]} onClick={handleInternetBankingClick}>
            <img className={styles["card"]} src={image1} alt="Internet Banking Icon" />
            <span className={styles["par"]}>Internet Banking</span>
            <span className={styles["arrow"]}><RiArrowRightSLine /></span>
          </div>
          <InternetBankingPopup isVisible={isInternetBankingPopupVisible}
            onClose={handleCloseInternetBankingPopup}/>
        </div>
        <div className={styles["payment-method"]}>
          <h2>UPI</h2>
          <div className={styles["method"]} onClick={handleUPIClick}>
            <img className={styles["card"]} src={image2} alt="UPI Icon" />
            <span className={styles["par"]}>Add a new UPI ID</span>
            <span className={styles["arrow"]}><RiArrowRightSLine /></span>
          </div>
          <UPIPopup isVisible={isUPIPopupVisible} onClose={handleCloseUPIPopup}/>
        </div>
        <div className={styles["payment-method"]}>
          <h2>Cards</h2>
          <div className={styles["method"]} onClick={handleCardClick}>
            <img className={styles["card"]} src={image3} alt="Card Icon" />
            <span className={styles["par"]}>Add a new Card</span>
            <span className={styles["arrow"]}><RiArrowRightSLine /></span>
          </div>
          <CardPopup isVisible={isCardPopupVisible} onClose={handleCloseCardPopup}/>
        </div>
        <div className={styles["payment-method"]}>
          <h2>Cash</h2>
          <div className={styles["method"]}>
            <img className={styles["card"]} src={image4} alt="Cash Icon" />
            <span className={styles["par2"]}>Pay with cash after service</span>
            <span className={styles["arrow"]}><RiArrowRightSLine /></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentGateway;

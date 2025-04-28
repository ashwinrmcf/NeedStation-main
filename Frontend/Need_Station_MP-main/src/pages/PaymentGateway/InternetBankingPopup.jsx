import styles from "./PaymentPopup.module.css";
import { RiArrowRightSLine } from "react-icons/ri";
import image1 from "../../assets/images/payment/axis.png";
import image2 from "../../assets/images/payment/canara.png";
import image3 from "../../assets/images/payment/hdfc.png";
import image4 from "../../assets/images/payment/icici.png";
import image5 from "../../assets/images/payment/indianoversea.png";
import image6 from "../../assets/images/payment/indusland.png";
import image7 from "../../assets/images/payment/kotak.png";
import image8 from "../../assets/images/payment/sbi.png";

const InternetBankingPopup = ({ isVisible, onClose }) => {
  // console.log(isVisible);

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
          <h2>Internet Banking</h2>
          <span
            className={styles["close-btn"]}
            onClick={onClose}
          >
            <RiArrowRightSLine />
          </span>
        </div>
        <input
          type="text"
          placeholder="Search bank name"
          className={styles["search-box"]}
        />
        <div className={styles["bank-list"]}>
          <div className={styles["bank-item"]}>
            <img className={styles["imeg"]} src={image1} alt="Axis Bank" />
            &nbsp;&nbsp;&nbsp;Axis Bank <RiArrowRightSLine />
          </div>
          <div className={styles["bank-item"]}>
            <img className={styles["imeg"]} src={image2} alt="Canara Bank" />
            &nbsp;&nbsp;&nbsp;Canara Bank <RiArrowRightSLine />
          </div>
          <div className={styles["bank-item"]}>
            <img className={styles["imeg"]} src={image3} alt="HDFC Bank" />
            &nbsp;&nbsp;&nbsp;HDFC Bank <RiArrowRightSLine />
          </div>
          <div className={styles["bank-item"]}>
            <img className={styles["imeg"]} src={image4} alt="ICICI Bank" />
            &nbsp;&nbsp;&nbsp;ICICI Netbanking <RiArrowRightSLine />
          </div>
          <div className={styles["bank-item"]}>
            <img
              className={styles["imeg"]}
              src={image5}
              alt="Indian Overseas Bank"
            />
            &nbsp;&nbsp;&nbsp;Indian Overseas Bank <RiArrowRightSLine />
          </div>
          <div className={styles["bank-item"]}>
            <img className={styles["imeg"]} src={image6} alt="IndusInd Bank" />
            &nbsp;&nbsp;&nbsp;IndusInd Bank <RiArrowRightSLine />
          </div>
          <div className={styles["bank-item"]}>
            <img className={styles["imeg"]} src={image7} alt="Kotak Bank" />
            &nbsp;&nbsp;&nbsp;Kotak Bank <RiArrowRightSLine />
          </div>
          <div className={styles["bank-item"]}>
            <img
              className={styles["imeg"]}
              src={image8}
              alt="State Bank of India"
            />
            &nbsp;&nbsp;&nbsp;State Bank of India <RiArrowRightSLine />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternetBankingPopup;

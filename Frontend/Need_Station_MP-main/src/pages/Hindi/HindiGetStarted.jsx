import styles from "../../components/GetStarted/GetStarted.module.css";
import { Link } from "react-router-dom";

const HindiGetStarted = () => {
  return (
    <div className={`${styles["service-section"]}`}>
      <div className={styles["text"]}>
        <div className={styles["main-text"]}>अभी एक हेल्पर बनें!</div>
        <div className={styles["sub-text"]}>
          आपके मददगार हाथ अंतर ला सकते हैं - आज ही हमसे जुड़ें!
        </div>
      </div>
      <Link to="/hi/helper-registration">
        <div className={styles["button"]}>
          <span className={styles["button-text"]}>पंजीकरण करें</span>
        </div>{" "}
      </Link>
    </div>
  );
};

export default HindiGetStarted;

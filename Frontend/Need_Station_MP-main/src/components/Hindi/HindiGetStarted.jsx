import styles from "./HindiGetStarted.module.css";
import { Link } from "react-router-dom";

const HindiGetStarted = () => {
  return (
    <div className={`${styles["service-section"]}`}>
      <div className={styles["text"]}>
        <div className={styles["main-text"]}>अब एक सहायक बनें!</div>
        <div className={styles["sub-text"]}>
          आपके सहायक हाथ एक अंतर ला सकते हैं – आज ही हमसे जुड़ें!
        </div>
      </div>
      <Link to="/hi/helper-registration">
        <div className={styles["button"]}>
          <span className={styles["button-text"]}>रजिस्टर करें</span>
        </div>{" "}
      </Link>
    </div>
  );
};

export default HindiGetStarted;

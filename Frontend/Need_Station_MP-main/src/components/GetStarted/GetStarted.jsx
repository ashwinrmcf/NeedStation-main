import styles from "./GetStarted.module.css";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <div className={`${styles["service-section"]}`}>
      <div className={styles["text"]}>
        <div className={styles["main-text"]}>Become a Helper now!</div>
        <div className={styles["sub-text"]}>
          Your Helping Hands Can Make a Difference – Join Us Today!
        </div>
      </div>
      <Link to="/helper-registration">
        <div className={styles["button"]}>
          <span className={styles["button-text"]}>Register</span>
        </div>{" "}
      </Link>
    </div>
  );
};

export default GetStarted;

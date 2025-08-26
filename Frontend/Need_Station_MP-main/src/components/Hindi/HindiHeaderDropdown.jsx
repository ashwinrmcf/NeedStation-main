import React from "react";
import { Link } from "react-router-dom";
import styles from "./HindiHeaderDropdown.module.css";

const HindiHeaderDropdown = () => {
  return (
    <div className={styles.dropdownMenu}>
      {/* First Row: Basic Needs */}
      <div className={styles.dropdownRow}>
        <h4 className={styles.dropdownHeading}>बुनियादी आवश्यकताएं</h4>
        <div className={styles.services}>
          <Link to="/hi/electrician">इलेक्ट्रीशियन</Link>
          <Link to="/hi/plumber">प्लंबर</Link>
          <Link to="/hi/water-supply">पानी की आपूर्ति</Link>
        </div>
      </div>
      {/* Second Row: Elder Care */}
      <div className={styles.dropdownRow}>
        <h4 className={styles.dropdownHeading}>बुजुर्गों की देखभाल</h4>
        <div className={styles.services}>
          <Link to="/hi/paralysis-care">पैरालिसिस केयर</Link>
          <Link to="/hi/caretaker">देखभालकर्ता</Link>
          <Link to="/hi/postnatal-care">प्रसवोत्तर देखभाल</Link>
          <Link to="/hi/nurse">नर्स</Link>
          <Link to="/hi/health-checkup">स्वास्थ्य जांच सेवाएं</Link>
          <Link to="/hi/babysitter">बेबी सिटर</Link>
        </div>
      </div>
    </div>
  );
};

export default HindiHeaderDropdown;

import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderDropdown.module.css";

const HeaderDropdown = () => {
  return (
    <div className={styles.dropdownMenu}>
      {/* First Row: Basic Needs */}
      <div className={styles.dropdownRow}>
        <h4 className={styles.dropdownHeading}>Basic Needs</h4>
        <div className={styles.services}>
          <Link to="/electrician">Electrician</Link>
          <Link to="/plumber">Plumber</Link>
          <Link to="/water-supply">Water Supply</Link>
        </div>
      </div>
      {/* Second Row: Elder Care */}
      <div className={styles.dropdownRow}>
        <h4 className={styles.dropdownHeading}>Elder Care</h4>
        <div className={styles.services}>
          <Link to="/paralysis-care">Paralysis Care</Link>
          <Link to="/caretaker">Caretaker</Link>
          <Link to="/postnatal-care">Postnatal Care</Link>
          <Link to="/nurse">Nurse</Link>
          <Link to="/services/health-checkup">Health Checkup Services</Link>
          <Link to="/babysitter">Baby Sitter</Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderDropdown;

import React from 'react';
import styles from './ContactUs.module.css';

const ContactUs = () => {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Contact us</h1>
        <form className={styles.form}>
          <label className={styles.label}>Full Name</label>
          <input type="text" placeholder="Enter full name" className={styles.input} />

          <label className={styles.label}>Email Address</label>
          <input type="email" placeholder="Enter your email address" className={styles.input} />

          <label className={styles.label}>Enter Phone Number</label>
          <div className={styles.phoneInput}>
            <select className={styles.countryCode}>
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              {/* Add more as needed */}
            </select>
            <input type="tel" placeholder="Phone Number" className={styles.phoneNumber} />
          </div>

          <label className={styles.label}>Enter Message</label>
          <textarea rows="5" placeholder="Enter message" className={styles.textarea}></textarea>

          <button type="submit" className={styles.submitBtn}>Submit</button>
        </form>
      </div>
    </>
  );
};

export default ContactUs;

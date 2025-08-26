import styles from './HomeSatisfactionContainer.module.css';

const HomeSatisfactionContainer = () => {
  return (
    <div className={`${styles["satisfaction-container"]}`}>
      <h2>आपकी संतुष्टि, <span className={styles["highlight"]}>गारंटीशुदा</span></h2>
      <div className={styles["satisfaction-features"]}>

        <div className={styles["feature"]}>
          <h3>खुशी की प्रतिज्ञा</h3>
          <p>यदि आप संतुष्ट नहीं हैं, तो हम इसे सही बनाने के लिए काम करेंगे।</p>
        </div>

        <div className={styles["feature"]}>
          <h3>सत्यापित टास्कर</h3>
          <p>प्लेटफॉर्म में शामिल होने से पहले टास्करों की हमेशा पृष्ठभूमि की जांच की जाती है।</p>
        </div>

        <div className={styles["feature"]}>
          <h3>समर्पित सहायता</h3>
          <p>जब आपको हमारी आवश्यकता हो - सप्ताह के हर दिन मित्रवत सेवा।</p>
        </div>

      </div>
    </div>
  );
};

export default HomeSatisfactionContainer;

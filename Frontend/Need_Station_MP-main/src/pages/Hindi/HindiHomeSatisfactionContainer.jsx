import styles from '../HomePage/HomeSatisfactionContainer.module.css';

const HindiHomeSatisfactionContainer = () => {
  return (
    <div className={`${styles["satisfaction-container"]}`}>
      <h2>आपकी संतुष्टि, <span className={styles["highlight"]}>गारंटीड</span></h2>
      <div className={styles["satisfaction-features"]}>

        <div className={styles["feature"]}>
          <h3>खुशी का वादा</h3>
          <p>यदि आप संतुष्ट नहीं हैं, तो हम इसे सही करने के लिए काम करेंगे।</p>
        </div>

        <div className={styles["feature"]}>
          <h3>जांचे हुए टास्कर</h3>
          <p>प्लेटफॉर्म में शामिल होने से पहले टास्कर की हमेशा पृष्ठभूमि की जांच की जाती है।</p>
        </div>

        <div className={styles["feature"]}>
          <h3>समर्पित सहायता</h3>
          <p>जब आपको हमारी आवश्यकता हो - सप्ताह के हर दिन मित्रवत सेवा।</p>
        </div>

      </div>
    </div>
  );
};

export default HindiHomeSatisfactionContainer;

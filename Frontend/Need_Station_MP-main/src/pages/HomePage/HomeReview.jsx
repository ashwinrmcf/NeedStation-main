import styles from './HomeReview.module.css';
import image1 from '../../assets/images/HomeReviewImage1.png';
import image2 from '../../assets/images/HomeReviewImage2.png';
import image3 from '../../assets/images/HomeReviewImage3.png';

const HomeReview = () => {
  return (
    <div className={`${styles["review-section"]}`}>
      <h2>What people are saying about us</h2>
      <div className={`${styles["review-cards"]}`}>
        
        {/* First Review Card */}
        <div className={`${styles["review-card"]} ${styles["gradient"]}`}>
          <div className={styles["quote"]}>“</div>
          <p className={styles["review-text"]}>
            Jose fixed my AC drain line which was clogging my master bathroom sink. He was prompt, communicative, and efficient. Highly recommend!
          </p>
          <div className={styles["reviewer-info"]}>
            <img src={image1} alt="Herman Jensen" className={styles["reviewer-img"]} />
            <div className={styles["reviewer-details"]}>
              <p className={styles["reviewer-name"]}>Herman Jensen</p>
              <p className={styles["reviewer-role"]}>Founder & Leader</p>
            </div>
          </div>
        </div>

        {/* Second Review Card */}
        <div className={`${styles["review-card"]} ${styles["transparent"]}`}>
          <div className={styles["quote"]}>“</div>
          <p className={styles["review-text"]}>
            Jose fixed my AC drain line which was clogging my master bathroom sink. He was prompt, communicative, and efficient. Highly recommend!
          </p>
          <div className={styles["reviewer-info"]}>
            <img src={image2} alt="Steve Mark" className={styles["reviewer-img"]} />
            <div className={styles["reviewer-details"]}>
              <p className={styles["reviewer-name"]}>Steve Mark</p>
              <p className={styles["reviewer-role"]}>Founder & Leader</p>
            </div>
          </div>
        </div>

        {/* Third Review Card */}
        <div className={`${styles["review-card"]} ${styles["transparent"]}`}>
          <div className={styles["quote"]}>“</div>
          <p className={styles["review-text"]}>
            Jose fixed my AC drain line which was clogging my master bathroom sink. He was prompt, communicative, and efficient. Highly recommend!
          </p>
          <div className={styles["reviewer-info"]}>
            <img src={image3} alt="Kenn Gallagher" className={styles["reviewer-img"]} />
            <div className={styles["reviewer-details"]}>
              <p className={styles["reviewer-name"]}>Kenn Gallagher</p>
              <p className={styles["reviewer-role"]}>Founder & Leader</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeReview;

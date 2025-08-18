import styles from '../HomePage/HomeReview.module.css';
import image1 from '../../assets/images/HomeReviewImage1.png';
import image2 from '../../assets/images/HomeReviewImage2.png';
import image3 from '../../assets/images/HomeReviewImage3.png';

const HindiHomeReview = () => {
  return (
    <div className={`${styles["review-section"]}`}>
      <h2>लोग हमारे बारे में क्या कह रहे हैं</h2>
      <div className={`${styles["review-cards"]}`}>
        
        {/* First Review Card */}
        <div className={`${styles["review-card"]} ${styles["gradient"]}`}>
          <div className={styles["quote"]}>"</div>
          <p className={styles["review-text"]}>
            जोस ने मेरी AC ड्रेन लाइन को ठीक किया जो मेरे मास्टर बाथरूम सिंक को जाम कर रहा था। वह समय पर था, संवादात्मक था, और कुशल था। अत्यधिक अनुशंसित!
          </p>
          <div className={styles["reviewer-info"]}>
            <img src={image1} alt="हरमन जेनसेन" className={styles["reviewer-img"]} />
            <div className={styles["reviewer-details"]}>
              <p className={styles["reviewer-name"]}>हरमन जेनसेन</p>
              <p className={styles["reviewer-role"]}>संस्थापक और नेता</p>
            </div>
          </div>
        </div>

        {/* Second Review Card */}
        <div className={`${styles["review-card"]} ${styles["transparent"]}`}>
          <div className={styles["quote"]}>"</div>
          <p className={styles["review-text"]}>
            जोस ने मेरी AC ड्रेन लाइन को ठीक किया जो मेरे मास्टर बाथरूम सिंक को जाम कर रहा था। वह समय पर था, संवादात्मक था, और कुशल था। अत्यधिक अनुशंसित!
          </p>
          <div className={styles["reviewer-info"]}>
            <img src={image2} alt="स्टीव मार्क" className={styles["reviewer-img"]} />
            <div className={styles["reviewer-details"]}>
              <p className={styles["reviewer-name"]}>स्टीव मार्क</p>
              <p className={styles["reviewer-role"]}>संस्थापक और नेता</p>
            </div>
          </div>
        </div>

        {/* Third Review Card */}
        <div className={`${styles["review-card"]} ${styles["transparent"]}`}>
          <div className={styles["quote"]}>"</div>
          <p className={styles["review-text"]}>
            जोस ने मेरी AC ड्रेन लाइन को ठीक किया जो मेरे मास्टर बाथरूम सिंक को जाम कर रहा था। वह समय पर था, संवादात्मक था, और कुशल था। अत्यधिक अनुशंसित!
          </p>
          <div className={styles["reviewer-info"]}>
            <img src={image3} alt="केन गैलाघर" className={styles["reviewer-img"]} />
            <div className={styles["reviewer-details"]}>
              <p className={styles["reviewer-name"]}>केन गैलाघर</p>
              <p className={styles["reviewer-role"]}>संस्थापक और नेता</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HindiHomeReview;

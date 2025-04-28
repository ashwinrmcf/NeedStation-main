import styles from './HomeHowItWorks.module.css';
import image from '../../assets/images/HomeHowItWorksImage.jpeg';

const HomeHowItWorks = () => {

  return <>
    
<div className={`${styles["how-it-works-container"]}`}>
  <div className={`${styles["how-it-works-text"]}`}>
      <h2>How it works</h2>
      <div className={`${styles["steps"]}`}>
          <div className={`${styles["step"]}`}>
              <span className={`${styles["step-number"]}`}>1</span>
              <p>Choose a Tasker by price, skills, and reviews</p>
          </div>
          <div className={`${styles["step"]}`}>
              <span className={`${styles["step-number"]}`}>2</span>
              <p>Schedule a Tasker as early as today.</p>
          </div>
          <div className={`${styles["step"]}`}>
              <span className={`${styles["step-number"]}`}>3</span>
              <p>Chat, pay, tip, and review all in one place.</p>
          </div>
      </div>
      <button className={`${styles["get-started"]}`}>Get Started</button>
  </div>
  <div className={`${styles["how-it-works-image"]}`}>
      <img src={image} alt="People discussing tasks" />
  </div>
</div>

  </>
}

export default HomeHowItWorks;
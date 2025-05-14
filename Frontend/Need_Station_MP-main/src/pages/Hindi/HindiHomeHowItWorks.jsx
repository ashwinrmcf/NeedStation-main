import styles from '../HomePage/HomeHowItWorks.module.css';
import image from '../../assets/images/HomeHowItWorksImage.jpeg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';

const HindiHomeHowItWorks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Handle Get Started button click
  const handleGetStarted = () => {
    if (user) {
      // If logged in, scroll to top of page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // If not logged in, redirect to signup page
      navigate('/hi/signup');
    }
  };

  return <>
    
<div className={`${styles["how-it-works-container"]}`}>
  <div className={`${styles["how-it-works-text"]}`}>
      <h2>यह कैसे काम करता है</h2>
      <div className={`${styles["steps"]}`}>
          <div className={`${styles["step"]}`}>
              <span className={`${styles["step-number"]}`}>1</span>
              <p>मूल्य, कौशल और समीक्षाओं के आधार पर टास्कर चुनें</p>
          </div>
          <div className={`${styles["step"]}`}>
              <span className={`${styles["step-number"]}`}>2</span>
              <p>आज से ही टास्कर शेड्यूल करें।</p>
          </div>
          <div className={`${styles["step"]}`}>
              <span className={`${styles["step-number"]}`}>3</span>
              <p>चैट, भुगतान, टिप और समीक्षा सभी एक ही जगह पर।</p>
          </div>
      </div>
      <button 
        className={`${styles["get-started"]}`}
        onClick={handleGetStarted}
      >
        शुरू करें
      </button>
  </div>
  <div className={`${styles["how-it-works-image"]}`}>
      <img src={image} alt="कार्यों पर चर्चा करते लोग" />
  </div>
</div>

  </>
}

export default HindiHomeHowItWorks;

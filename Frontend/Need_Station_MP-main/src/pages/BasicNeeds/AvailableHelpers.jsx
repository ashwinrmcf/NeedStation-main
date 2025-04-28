import styles from './AvailableHelpers.module.css';
import { Link } from 'react-router-dom';
import image1 from "../../assets/images/Rina.jpg"
import image2 from "../../assets/images/cardImage2.jpeg"
import image3 from "../../assets/images/Jane_Austin.jpg"

const AvailableHelpers = () => {
    return (
        <div className={styles['container']}>
          <div className={styles["header"]}>
        <Link to="/">
          <div className={styles["logo"]}>
            Need<span style={{ color: "#5CE1E6" }}>Station</span>
          </div>
        </Link>
        <div className={styles["progress-bar"]}>
          <div className={`${styles["step"]} ${styles["active"]}`}>
            <div className={styles["circle"]}></div>
            
          </div>
          <div className={styles["line"]}></div>
          <div className={styles["step"]}>
            <div className={styles["circle"]}></div>
            
          </div> <div className={styles["line1"]}></div><span className={styles["helper-list"]}>Browse Taskers and Price</span>
          <div className={styles["line1"]}></div>
          <div className={styles["step"]}>
            <div className={styles["circle"]}></div>
          </div>
          <div className={styles["line"]}></div>
          <div className={styles["step"]}>
            <div className={styles["circle"]}></div>
          </div>
        </div>
      </div>

      <div className={styles["container2"]}>
            <div className={styles['rectangle']}>
                {/* Date Section */}
                <div className={styles['date-group']}>
                    <h2>Date</h2>
                    <div className={styles['date-options']}>
                        <button>Today</button>
                        <button>Within 2 Days</button>
                        <button>Within 2 Weeks</button>
                        <button>Choose Dates</button>
                    </div>
                </div>

                {/* Time of the Day Section */}
                <div className={styles['time-group']}>
                    <h2>Time Of The Day</h2>
                    <div className={styles['time-options']}>
                        <label>
                            <input type="checkbox" /> Morning (8am - 12pm)
                        </label>
                        <label>
                            <input type="checkbox" /> Afternoon (12pm - 5pm)
                        </label>
                        <label>
                            <input type="checkbox" /> Evening (5pm - 9:30pm)
                        </label>
                    </div>
                </div>

                {/* Price Section */}
                <div className={styles['price-group']}>
                    <h2>Price</h2>
                    <p>The Average Hourly Rate For Cleaning Is $$$</p>
                </div>
            </div>

            {/* Tasker Profiles */}
            {[
                {
                    name: 'Rina Choudhary',
                    image: image1,
                    rate: '54$/hr',
                    reviews: '5.0 (50 reviews)',
                    tasks: '32 furniture assembly tasks',
                },
                {
                    name: 'Huzefa Qureshi',
                    image: image2,
                    rate: '54$/hr',
                    reviews: '5.0 (50 reviews)',
                    tasks: '32 furniture assembly tasks',
                },
                {
                    name: 'Jane Austin',
                    image: image3,
                    rate: '54$/hr',
                    reviews: '5.0 (50 reviews)',
                    tasks: '32 furniture assembly tasks',
                },
            ].map((tasker, index) => ( <Link to = "/payment-gateway">
                <div key={index} className={styles['tasker-profile']}>
                    {/* Profile Section */}
                    <div className={styles['profile-section']}>
                        <div className={styles['profile-image']}>
                            <img src={tasker.image} alt="Profile Photo" />
                        </div>
                        <p className={styles['profile-link']}>View Profile & reviews</p>
                        <button className={styles['select-button']}>Select and continue</button>
                        <p className={styles['note']}>
                            You can call your Tasker, adjust task details, or change task time after booking.
                        </p>
                    </div>

                    {/* Info Section */}
                    <div className={styles['info-section']}>
                        <div className={styles['info-header']}>
                            <h2 className={styles['tasker-name']}>{tasker.name}</h2>
                            <div className={styles['rate']}>{tasker.rate}</div>
                        </div>
                        <p className={styles['reviews']}>{tasker.reviews}</p>
                        <p className={styles['tasks']}>{tasker.tasks}</p>
                        <div className={styles['help-section']}>
                            <h3>How can I help:</h3>
                            <p className={styles['help-description']}>
                                Meticulous cleaner with over 5+ years of experience in cleaning private apartments.
                                Achieved 100% adherence to sanitization policies and received consistently high customer
                                satisfaction rating. Maintained a highly hygienic environment by sanitizing and
                                disinfecting surfaces equipment...
                                <span className={styles['read-more']}>Read more</span>
                            </p>
                        </div>
                    </div>
                </div> </Link>
            ))}
            </div>
        </div>
    );
};

export default AvailableHelpers;

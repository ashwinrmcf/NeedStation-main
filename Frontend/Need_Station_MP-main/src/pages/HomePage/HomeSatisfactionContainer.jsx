import styles from './HomeSatisfactionContainer.module.css';

const HomeSatisfactionContainer = () => {
  return (
    <div className={`${styles["satisfaction-container"]}`}>
      <h2>Your satisfaction, <span className={styles["highlight"]}>guaranteed</span></h2>
      <div className={styles["satisfaction-features"]}>

        <div className={styles["feature"]}>
          <h3>Happiness Pledge</h3>
          <p>If you’re not satisfied, we’ll work to make it right.</p>
        </div>

        <div className={styles["feature"]}>
          <h3>Vetted Taskers</h3>
          <p>Taskers are always background checked before joining the platform.</p>
        </div>

        <div className={styles["feature"]}>
          <h3>Dedicated Support</h3>
          <p>Friendly service when you need us – every day of the week.</p>
        </div>

      </div>
    </div>
  );
};

export default HomeSatisfactionContainer;

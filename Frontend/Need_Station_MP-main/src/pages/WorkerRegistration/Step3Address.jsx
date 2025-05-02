import styles from './WorkerRegistration.module.css'; // Import the CSS module

const Step3Aadhaar = ({ data, updateForm, next, back }) => {
  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
  };

  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>Identity Verification</h2>

      <div className={styles.formSection}>
        <label className={styles.label}>Aadhaar Number</label>
        <input
          name="aadhaar"
          value={data.aadhaar}
          onChange={handleChange}
          placeholder="Enter Aadhaar number"
          className={styles.input}
        />
      </div>

      <div className={styles.formSection}>
        <label className={styles.label}>Verification Status</label>
        <select
          name="verification"
          value={data.verification}
          onChange={handleChange}
          className={`${styles.input} ${styles.option}`}
        >
          <option value="">Select status</option>
          <option value="Pending">Pending</option>
          <option value="Verified">Verified</option>
        </select>
      </div>

      <button onClick={back} className={styles.button}>Back</button>
      <button onClick={next} className={styles.button}>Next</button>
    </main>
  );
};

export default Step3Aadhaar;
